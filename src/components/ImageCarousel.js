import React, { useState } from "react";

import ImageNotAvailable from "../assets/no-image.png";
import Loader from "./Loader";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as Close } from "../assets/close.svg";

import "../css/ImageCarousel.css";

function ImageCarousel({ images, toggleCarousel }) {
  const defaultImgUrl = images[0];
  const [activeImg, setActiveImg] = useState({ idx: 0, url: defaultImgUrl });
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = (e) => {
    e.target.src = ImageNotAvailable;
  };

  const prevImage = () => {
    setIsLoading(true);
    const newIdx =
      activeImg["idx"] === 0 ? images.length - 1 : activeImg["idx"] - 1;
    const newImgUrl = images[newIdx];
    setActiveImg({ idx: newIdx, url: newImgUrl });
  };
  const nextImage = () => {
    setIsLoading(true);
    const newIdx =
      activeImg["idx"] === images.length - 1 ? 0 : activeImg["idx"] + 1;
    const newImgUrl = images[newIdx];
    setActiveImg({ idx: newIdx, url: newImgUrl });
  };
  return (
    <div className="image-carousel-container">
      {images.length > 0 && (
        <div className="carousel-wrapper">
          <button className="arrow-btn" onClick={prevImage}>
            {<Arrow style={{ transform: "rotate(180deg)" }} />}
          </button>
          <div className="carousel-center">
            <div className="active-image-container">
              {activeImg["url"] !== null ? (
                <>
                  <img
                    onLoad={() => setIsLoading(false)}
                    onError={handleImageError}
                    src={activeImg["url"]}
                    alt="carousel slide"
                    className="carousel-slide full"
                    style={{
                      opacity: isLoading ? "0.5" : "1",
                      filter: isLoading ? "blur(10px)" : "",
                    }}
                  />
                  {isLoading && <Loader />}
                </>
              ) : (
                <img
                  src={ImageNotAvailable}
                  alt="img not available"
                  className="carousel-slide"
                />
              )}
            </div>
            <div className="image-count">
              {activeImg["idx"] + 1}/{images.length}
            </div>
          </div>
          <button className="arrow-btn" onClick={nextImage}>
            {<Arrow />}
          </button>
          <button className="close-btn" onClick={() => toggleCarousel(images)}>
            {<Close />}
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
