import { useRef, useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import ReactHtmlParser from "react-html-parser";

import Quote from "./Quote";
import { ReactComponent as Reply } from "../../assets/reply-arrow.svg";

import "../../css/Comments.css";

export default function Comment(props) {
	const { info } = props;
	const [checked, setChecked] = useState(false);
	const [shouldRemoveExpand, setShouldRemoveExpand] = useState(true);
	const messageRef = useRef(null);
	const fontSize = 16;
	const lineHeight = 1.5;
	const desiredLines = 3;

	// const headerHeight = document.querySelector(".header-nav").offsetHeight;
	// const browseHeaderHeight = document.querySelector(
	// 	".posts-dashboard-header"
	// ).offsetHeight;

	let hasQuote;
	if (Array.isArray(info.message)) {
		hasQuote = info.message.some(
			(item) => typeof item === "object" && item !== null
		);
	}

	const formattedMessages = useMemo(() => {
		return info.message
			.filter((e) => e !== "<br/>" && e !== "&nbsp;" && e !== " ")
			.map((messageItem) => {
				if (typeof messageItem === "object") {
					return <Quote info={messageItem} />;
				} else {
					return ReactHtmlParser(messageItem, { transform });
				}
			});
	}, [info.message]);

	useEffect(() => {
		const desiredHeight = fontSize * lineHeight * desiredLines;

		const resizeObserver = new ResizeObserver(() => {
			setShouldRemoveExpand(true);
			if (
				messageRef?.current?.offsetHeight > desiredHeight ||
				(messageRef?.current?.offsetHeight < desiredHeight && hasQuote)
			) {
				setShouldRemoveExpand(false);
			}
		});

		resizeObserver.observe(messageRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const formatDate = (date) => {
		if (!date) return "";

		const dateObj = new Date(date);

		return format(dateObj, "eee, d MMM. yyyy");
	};

	return (
		<div
			{...props}
			className={`comment-container`}
			style={{
				"--max-lines": desiredLines,
				"--line-height": lineHeight,
				"--font-size": fontSize,
			}}
			onClick={(e) => {
				console.log(e.currentTarget.clientHeight);
			}}
		>
			<div className={`comment-info`}>
				<a
					href={`${info.link}`}
					target="_blank"
					rel="noreferrer"
					className={`comment-reply`}
				>
					<Reply className="comment-icon" />

					<p className={`comment-number`}>Reply #{info.number}</p>
				</a>
				<p className={`comment-date`}>{formatDate(info["created_at"])}</p>
				<p
					className={`comment-commenter ${info.is_starter ? "starter" : null}`}
				>
					{info.commenter}
				</p>
			</div>
			<div
				ref={messageRef}
				className={`comment-message ${checked ? "checked" : "unchecked"} ${
					shouldRemoveExpand ? "unexpand" : ""
				} ${formattedMessages.length <= 1 ? "single" : ""}`}
			>
				{formattedMessages.map((item) => item)}
			</div>
			<input
				className={`expand`}
				type="checkbox"
				onChange={(e) => {
					setChecked(e.target.checked);
				}}
			/>
		</div>
	);
}

function transform(node, index) {
	// Ignore <br> tags
	if (node.type === "tag" && node.name === "br") {
		return null; // returning null removes the node
	}
	if (node.type === "text") {
		return <p>{node.data}</p>;
	}
}
