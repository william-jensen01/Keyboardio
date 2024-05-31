import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import LazyLoad from "react-lazyload";

import { useOutsideToggle } from "../../util/useOutsideToggle";
import Post from "./Post";
import Paginate from "../Paginate";
import FilterPosts from "../FilterPosts";
import { ReactComponent as Wave } from "../../assets/wave.svg";

import "../../css/PostsDashboard.css";
import ImageCarousel from "../ImageCarousel";

function PostsDashboard() {
	const params = useParams();
	const history = useHistory();
	const location = useLocation();

	// initialize state
	const [numPages, setNumPages] = useState(null); // pagination
	const [isLoading, setIsLoading] = useState(false); // used to show post skeleton loading
	const [currentPosts, setCurrentPosts] = useState([]);
	const [referrer, setReferrer] = useState(null); // when true, will contain a url to redirect page. Used for updating url info (postType, dateType, page, limit)
	const [cardStyle] = useState("small"); // allow the ability to change card style preference in the future
	const [activePost, setActivePost] = useState(null); // for showing ImageCarousel
	console.log("active", activePost);
	// const [activePost, setActivePost] = useState({
	// 	element: null,
	// 	data: {},
	// });

	const carouselRef = useRef(null);

	// (**) => ignore; (--) => what it is
	// url path params -> **website url**/posts/--dateType--/--postType--?**query params**
	const dateType = params["dateType"];
	const postType = params["postType"];
	// url query params -> **urlpath**?page=__&limit=__
	let currentUrlParams = new URLSearchParams(location.search);
	const page = Number(currentUrlParams.get("page"));
	const limit = Number(currentUrlParams.get("limit"));

	// used in FilterPosts to apply new filters
	const changeReferrer = (newUrl) => {
		setReferrer(newUrl);
	};
	// used by Pagination to update/change the page by redirect
	const changePage = (newPage) => {
		setReferrer(
			`/posts/${dateType}/${postType}?page=${newPage}&limit=${limit}`
		);
	};

	// set referrer to null when location changes to allow switching from back and forth. Whenever we want to change the page through Paginate referrer can't already exist so this is how we 'reset' it.
	// What problem or bug does this solve? If you are on page 2 and you click on 3 you will be redirected to page 3. If you go back to the previous page through the browser or the back mouse button, you will go back to page 2 (because it's on the history stack). If you were to then click on 3 it wouldn't do anything because it's trying to redirect to the previous referrer state (page 2) which is the page you are currently on. Hence, not changing the page
	useEffect(() => {
		setReferrer(null);
	}, [location]);

	// scroll to top of page, fetch posts from database and set states with the data whenever history or location (information in the url) changes
	useEffect(() => {
		window.scroll(0, 0); // note: I'm not sure why this will sometimes scroll to the top. It works 100% when clicking on any num in pagination bar. But when clicking the browsers back arrow or hitting back button on mouse it will sometimes work

		setIsLoading(true);

		// take the postType and convert into abbreviations
		// example: 'interest-checks' will return 'ic'
		const abbreviatePostType = () => {
			if (postType === "interest-checks") return "ic";
			if (postType === "group-buys") return "gb";
			if (postType === "all") return "all";
		};
		let formattedPostType = abbreviatePostType();

		async function fetchData() {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/posts/${formattedPostType}/${dateType}?page=${page}&limit=${limit}`
				);
				setIsLoading(false);
				setCurrentPosts(res.data.posts);
				setNumPages(res.data.page_info.total_pages);
			} catch (err) {
				// history.go(0);
				console.log(err);
			}
		}

		fetchData();
	}, [history, dateType, postType, page, limit]);

	useOutsideToggle(carouselRef, () => setActivePost(undefined));

	return (
		<div className="posts-dashboard-container" ref={carouselRef}>
			{referrer && <Redirect push to={referrer} />}
			{activePost?.images?.length > 0 && (
				<ImageCarousel
					images={activePost?.images}
					toggleCarousel={(x) => setActivePost(null)}
				/>
			)}
			<div className="posts-main-content">
				<div className="posts-dashboard-header">
					<h1 className="posts-dashboard-title">
						{`${
							(dateType === "latest" && "Latest") ||
							(dateType === "newest" && "Newest")
						} ${
							(postType === "all" && "Posts") ||
							(postType === "interest-checks" && "Interest Checks") ||
							(postType === "group-buys" && "Group Buys")
						}`}
					</h1>

					<FilterPosts
						dateType={dateType}
						postType={postType}
						limit={limit}
						changeReferrer={changeReferrer}
					/>
				</div>

				<div className="posts-container">
					{isLoading &&
						Array.from(Array(limit), (e, i) => (
							<Post key={i} post={{}} cardStyle={cardStyle} isSkeleton={true} />
						))}
					{isLoading === false &&
						currentPosts.length > 0 &&
						currentPosts.map((post) => (
							<LazyLoad
								key={post.id}
								placeholder={
									<Post post={{}} cardStyle={cardStyle} isSkeleton={true} />
								}
								once
							>
								<Post
									post={post}
									cardStyle={cardStyle}
									dateType={dateType}
									setActivePost={setActivePost}
									isSkeleton={false}
									once
								/>
							</LazyLoad>
						))}
				</div>

				{currentPosts.length > 0 && (
					<Paginate
						totalPageCount={numPages}
						currentPage={page}
						changePage={changePage}
					/>
				)}
			</div>

			<Wave className="posts-wave" />
		</div>
	);
}

export default PostsDashboard;
