import { useState } from "react";

import Loader from "./Loader";
import ImageNotAvailable from "../assets/no-image.png";
import No from "../assets/no.png";

import "../css/Post.css";

export default function Image({ src, cardStyle, setActivePost }) {
	const [imgLoaded, setImgLoaded] = useState(false);
	const [imgError, setImgError] = useState(false);

	const handleImageError = (e) => {
		e.target.src = ImageNotAvailable;
		e.target.className = `post-${cardStyle}-hero-image-na`;
		e.target.alt = "image not available";
	};
	return (
		// <div className={`post-${cardStyle}-image-container`}>
		<>
			{src !== null ? (
				<>
					<img
						onError={(e) => {
							setImgError(true);
							handleImageError(e);
						}}
						src={src}
						alt="post hero background"
						className={`post-${cardStyle}-hero-image-background`}
						style={{ display: imgError ? "none" : "" }}
					/>
					{imgLoaded === false && <Loader />}

					<img
						onError={handleImageError}
						onLoad={() => {
							setImgLoaded(true);
						}}
						src={src}
						className={`post-${cardStyle}-hero-image-foreground`}
						alt="post hero"
						style={{ display: imgLoaded ? "" : "none" }}
					/>
				</>
			) : (
				<img
					src={No}
					alt="not available"
					className={`post-${cardStyle}-hero-image-none`}
					loading="lazy"
				/>
			)}
		</>
		// </div>
	);
}
