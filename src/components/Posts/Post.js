import React, { useState, useRef, useEffect } from "react";
import { format, parseISO, isToday } from "date-fns";

import Image from "../Image";
import Comments from "../Comments/index";
import { ReactComponent as Share } from "../../assets/share.svg";
import { ReactComponent as Comment } from "../../assets/comment.svg";

import "../../css/Post.css";

function Post({ post, cardStyle, setActivePost, isSkeleton }) {
	const postRef = useRef(null);
	const containerRef = useRef(null);
	const titleRef = useRef(null);

	const [showComments, setShowComments] = useState(false);
	const [commentData, setCommentData] = useState({
		comments: [],
		page_info: {
			current_page: 1,
			has_next: false,
			has_prev: false,
		},
	});

	const headerHeight = document?.querySelector(".header-nav").offsetHeight;
	const browserHeaderHeight = document?.querySelector(
		".posts-dashboard-header"
	).offsetHeight;
	const totalHeight = browserHeaderHeight + headerHeight;

	const updateCommentData = (newData) => {
		setCommentData({
			comments: [...commentData.comments, ...newData.items],
			page_info: newData.page_info,
		});
	};

	const unsecureCopyToClipboard = (text) => {
		console.log("unsecure copy");
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand("copy");
		} catch (err) {
			console.log("unable to copy to clipboard", err);
		}
		document.body.removeChild(textArea);
	};
	const handleShare = (e) => {
		if (window.isSecureContext && navigator.clipboard) {
			navigator.clipboard.writeText(post.url);
		} else {
			unsecureCopyToClipboard(post.url);
		}
	};

	const formatDate = (date, field) => {
		if (!date) return "";
		const dateObj = new Date(date);
		if (isToday(dateObj)) {
			return format(dateObj, "hh:mm a 'Today'");
		}
		return format(parseISO(date), "d, MMM. yyyy");
	};

	useEffect(() => {
		const headerHeight = document.querySelector(".header-nav").offsetHeight;
		const browserHeaderHeight = document.querySelector(
			".posts-dashboard-header"
		).offsetHeight;
		const totalHeight = browserHeaderHeight + headerHeight;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					postRef.current?.classList.add("slide-in");

					observer.unobserve(entry.target);
				} else {
					postRef.current?.classList.remove("slide-in");
				}
			},
			{ rootMargin: `-${totalHeight}px 0px 0px 0px`, threshold: [0.0] }
		);
		observer.observe(postRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={postRef} className={`post-${cardStyle}`}>
			<div ref={containerRef} className={`post-${cardStyle}-container`}>
				<div
					className={`post-image-container ${isSkeleton && "skeleton"}`}
					onClick={(e) => {
						setActivePost(post);
					}}
				>
					{!isSkeleton && post.images.length > 0 && (
						<Image src={post.images[0]} cardStyle={cardStyle} />
					)}
				</div>

				<div
					className={`post-${cardStyle}-wrapper ${isSkeleton && "skeleton"}`}
				>
					<div className={`post-${cardStyle}-info`}>
						<div className={`post-${cardStyle}-header`}>
							{!isSkeleton ? (
								<a
									ref={titleRef}
									className={`post-${cardStyle}-title`}
									href={post.url}
								>
									{post.title}
								</a>
							) : (
								<div className={`post-${cardStyle}-title skeleton`}></div>
							)}
						</div>
						<div className={`post-${cardStyle}-sub`}>
							<p
								className={`post-${cardStyle}-type ${
									post.post_type === "GB" ? "gb" : "ic"
								} ${isSkeleton && "skeleton"}`}
							>
								{!isSkeleton && `${post.post_type}`}
							</p>
							<p
								className={`post-${cardStyle}-creator ${
									isSkeleton && "skeleton"
								}`}
							>
								{!isSkeleton && post.creator}
							</p>
						</div>
						<p className={`post-${cardStyle}-date`}>
							<span className={isSkeleton && "skeleton"}>
								{!isSkeleton && `Last Updated :`}
							</span>
							<span className={isSkeleton && "skeleton"}>
								{!isSkeleton && formatDate(post.last_updated, "updated")}
							</span>
						</p>
						<p className={`post-${cardStyle}-date`}>
							<span className={isSkeleton && "skeleton"}>
								{!isSkeleton && `Created :`}
							</span>
							<span className={isSkeleton && "skeleton"}>
								{!isSkeleton && formatDate(post.created, "created")}
							</span>
						</p>
					</div>
					<div
						className={`post-${cardStyle}-actions ${isSkeleton && "skeleton"}`}
					>
						<button
							className={`post-${cardStyle}-button ${isSkeleton && "skeleton"}`}
							onClick={handleShare}
							disabled={isSkeleton}
						>
							<Share
								className={`post-${cardStyle}-icon ${isSkeleton && "skeleton"}`}
							/>
						</button>
						<button
							className={`post-${cardStyle}-button ${isSkeleton && "skeleton"}`}
							onClick={() => {
								setShowComments((prev) => !prev);
							}}
							disabled={isSkeleton}
						>
							<Comment
								className={`post-${cardStyle}-icon ${isSkeleton && "skeleton"}`}
							/>
						</button>
					</div>
				</div>
			</div>
			{showComments && (
				<Comments
					topicId={post.topic_id}
					comments={commentData.comments}
					pageInfo={commentData.page_info}
					updateCommentData={updateCommentData}
				/>
			)}
		</div>
	);
}

export default Post;
