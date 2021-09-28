import React, { useState, useRef } from "react";

import No from "../../assets/no.png";
import ImageNotAvailable from "../../assets/no-image.png";
import { useOutsideToggle } from "../../util/useOutsideToggle";
import ImageCarousel from "../ImageCarousel";
import Loader from "../Loader";

// import "./PostsDashboard.css";
import "../../css/Post.css";

// object that contains long month as key and short month as value
// this is cleaner than chaining a bunch of if statements
const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

function Post({ post, cardStyle }) {
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

  // shorten month to 3 letteres
  // example: 18:37:20 Tue, September 03, 2021 will return Sep
  // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
  const shortenDate = (date) => {
    const dateArr = date.split(" ");
    const month = dateArr[2];

    dateArr[2] = months[month]; // replace the old long month in the array with the new shortened one
    return dateArr.join(" "); // join the array of strings together with a space as the separator and return it
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
              {shortenDate(post.last_updated)}
            </span>
          </p>
          <p className={`post-${cardStyle}-date-container`}>
            <span className={`post-${cardStyle}-date-type`}>Created: </span>
            <span className={`post-${cardStyle}-date`}>
              {shortenDate(post.created)}
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
