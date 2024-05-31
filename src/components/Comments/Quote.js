import { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import ReactHtmlParser from "react-html-parser";

import { ReactComponent as Quotation } from "../../assets/quotation.svg";

import "../../css/Comments.css";

export default function Quote({ info }) {
	const messageRef = useRef();
	const [checked, setChecked] = useState(false);
	const [shouldRemoveExpand, setShouldRemoveExpand] = useState(false);

	const fontSize = 12.8;
	const lineHeight = 1.5;
	const desiredLines = 3;

	const hasQuote = info.message.some(
		(item) => typeof item === "object" && item !== null
	);

	useEffect(() => {
		const desiredHeight = fontSize * lineHeight * desiredLines;

		if (messageRef.current?.offsetHeight <= desiredHeight && !hasQuote) {
			setShouldRemoveExpand(true);
		} else if (
			info?.message?.length === 1 &&
			typeof info?.message[0] === "object"
		) {
			setShouldRemoveExpand(true);
		}
	}, []);

	const formatDate = (date) => {
		const dateObj = new Date(date);
		return format(dateObj, "d, MMM. yyyy");
	};

	return (
		<div className={`quote`}>
			<div className={`quote-top`}>
				<div className={`quote-from`}>
					<Quotation className="quote-quotation" />
					{info.hasOwnProperty("commenter") && (
						<p className={`comment-commenter`}>{info.commenter}</p>
					)}
				</div>
				{info.hasOwnProperty("created_at") && (
					<p className={`comment-created`}>{formatDate(info["created_at"])}</p>
				)}
			</div>
			<div
				ref={messageRef}
				className={`comment-message ${checked ? "checked" : "unchecked"} ${
					shouldRemoveExpand && "unexpand"
				} ${info.message.length <= 1 ? "single" : ""}`}
			>
				{info.hasOwnProperty("message") &&
					info.message.map((messageItem, i) => {
						if (typeof messageItem === "object") {
							return (
								<Quote key={`${info.message_id}.${i}`} info={messageItem} />
							);
						} else {
							return ReactHtmlParser(messageItem, { transform });
						}
					})}
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
