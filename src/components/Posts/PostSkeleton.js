import React from "react";

import "../../css/Post.css";

function PostSkeleton({ cardStyle }) {
  return (
    <div
      className={`post-${cardStyle}-container`}
      style={{ backgroundColor: "white", opacity: "0.85" }}
    >
      <div className={`post-${cardStyle}-image-container`}>
        <div
          className={`post-${cardStyle}-hero-image-foreground skeleton`}
        ></div>
      </div>
      <div className={`post-${cardStyle}-info`}>
        <div className={`post-${cardStyle} skeleton-text skeleton`}></div>
        <div className={`post-${cardStyle} skeleton-text skeleton`}></div>
        <div className={`post-${cardStyle} skeleton-text skeleton`}></div>
        <div className={`post-${cardStyle} skeleton-text skeleton`}></div>
        <div className={`post-${cardStyle} skeleton-text skeleton`}></div>
      </div>
    </div>
  );
}

export default PostSkeleton;
