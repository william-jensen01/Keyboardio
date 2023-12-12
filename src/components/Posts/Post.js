import React, { useState, useRef } from "react";
import { format, parseISO } from "date-fns";

import No from "../../assets/no.png";
import ImageNotAvailable from "../../assets/no-image.png";
import { useOutsideToggle } from "../../util/useOutsideToggle";
import ImageCarousel from "../ImageCarousel";
import Loader from "../Loader";

// import "./PostsDashboard.css";
import "../../css/Post.css";

function Post({ post, cardStyle, dateType }) {
	const [imgLoaded, setImgLoaded] = useState(false);
	const [imgError, setImgError] = useState(false);
	const [showCarousel, setShowCarousel] = useState(false);
	const carouselRef = useRef();

	const toggleCarousel = () => {
		return post.images[0] === null ? "" : setShowCarousel(!showCarousel);
	};

	const handleImageError = (e) => {
		e.target.src = ImageNotAvailable;
		e.target.className = `post-${cardStyle}-hero-image-na`;
		e.target.alt = "img not available";
	};

	const formatDate = (date, field) => {
		if (dateType === "latest") {
			if (field === "last_updated") {
				return format(parseISO(date), "hh:mm a 'on' d, MMM. yyyy");
			}
			if (field === "created") {
				return format(parseISO(date), "d, MMM. yyyy");
			}
		}

		if (dateType === "newest") {
			if (field === "last_updated") {
				return format(parseISO(date), "d, MMM. yyyy");
			}
			if (field === "created") {
				return format(parseISO(date), "hh:mm a 'on' d, MMM. yyyy");
			}
		}
		// "d, MMM. yyyy 'at' HH:mm:ss"
	};

	useOutsideToggle(carouselRef, () => setShowCarousel(false));

	return (
		<div ref={carouselRef}>
			<div className={`post-${cardStyle}-container`}>
				<div
					className={`post-${cardStyle}-image-container`}
					onClick={toggleCarousel}
				>
					{post.images[0] !== null ? (
						<>
							<img
								onError={(e) => {
									setImgError(true);
									handleImageError(e);
								}}
								src={post.images[0]}
								alt="post hero img background"
								className={`post-${cardStyle}-hero-image-background`}
								style={{ display: imgError ? "none" : "" }}
							/>
							{imgLoaded === false && <Loader />}

							<img
								onError={(e) => handleImageError(e)}
								onLoad={() => {
									setImgLoaded(true);
								}}
								src={post.images[0]}
								className={`post-${cardStyle}-hero-image-foreground`}
								alt="post hero img"
								style={{ display: imgLoaded ? "" : "none" }}
							/>
						</>
					) : (
						<img
							src={No}
							alt="img not available"
							className={`post-${cardStyle}-hero-image-none`}
							loading="lazy"
						/>
					)}
				</div>
				<div className={`post-${cardStyle}-info`}>
					<a
						href={post.url}
						target="_blank"
						rel="noreferrer"
						className={`post-${cardStyle}-title`}
					>
						{post.title}
					</a>
					<p className={`post-${cardStyle}-creator`}>{post.creator}</p>
					<p className={`post-${cardStyle}-date-container`}>
						<span className={`post-${cardStyle}-date-type`}>
							Last updated:{" "}
						</span>
						<span className={`post-${cardStyle}-date`}>
							{formatDate(post.last_updated, "last_updated")}
						</span>
					</p>
					<p className={`post-${cardStyle}-date-container`}>
						<span className={`post-${cardStyle}-date-type`}>Created: </span>
						<span className={`post-${cardStyle}-date`}>
							{formatDate(post.created, "created")}
						</span>
					</p>
				</div>
			</div>
			{showCarousel && (
				<ImageCarousel images={post.images} toggleCarousel={toggleCarousel} />
			)}
		</div>
	);
}

export default Post;
