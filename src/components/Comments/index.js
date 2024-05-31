import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

import Comment from "./Comment";

import "../../css/Comments.css";

export default function Comments({
	topicId,
	comments,
	pageInfo,
	updateCommentData,
}) {
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(pageInfo.current_page);
	const loaderRef = useRef(null);
	const pageInfoRef = useRef(null);
	const loadingRef = useRef(null);
	loadingRef.current = loading;
	pageInfoRef.current = pageInfo;

	const fetchComments = () => {
		if (!loading) setLoading(true);

		axios
			.get(
				`${
					process.env.REACT_APP_API_URL
				}/comments/${topicId}?page=${currentPage}&limit=${25}&sort=desc`
			)
			.then((res) => {
				updateCommentData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				if (err.response?.status !== 404) {
					console.log("page does not exist");
					console.log(err);
				}
				setLoading(false);
			});
	};

	// const fetchComments = useCallback(() => {
	// 	if (!loading) setLoading(true);

	// 	axios
	// 		.get(
	// 			`${
	// 				process.env.REACT_APP_API_URL
	// 			}/comments/${topicId}?page=${currentPage}&limit=${25}&sort=desc`
	// 		)
	// 		.then((res) => {
	// 			updateCommentData(res.data);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			if (err.response?.status !== 404) {
	// 				console.log("page does not exist");
	// 				console.log(err);
	// 			}
	// 			setLoading(false);
	// 		});
	// }, [currentPage, topicId, updateCommentData]);

	useEffect(() => {
		if (comments.length === 0 || pageInfo.current_page !== currentPage) {
			fetchComments();
		} else {
			setLoading(false);
		}
	}, [currentPage]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && pageInfoRef.current.has_next) {
					setCurrentPage((prev) => prev + 1);
				}
			},
			{ rootMargin: `0px 0px ${-65}px 0px`, threshold: [0.0] }
		);
		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, []);

	return (
		<div className={`comments-container`}>
			{comments.length > 0
				? comments.map((comment, i) => (
						<Comment key={comment.message_id} info={comment} />
				  ))
				: !loading && (
						<p style={{ color: "white", fontFamily: "'Poppins', sans-serif" }}>
							Uh oh, this post has no comments!
						</p>
				  )}

			<div ref={loaderRef}>
				{loading && (
					<span className="progressbar" role="progressbar">
						<span className="pill" />
						<span className="pill" />
					</span>
				)}
			</div>
		</div>
	);
}
