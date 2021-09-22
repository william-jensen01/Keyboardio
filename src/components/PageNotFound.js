import React from "react";

import { ReactComponent as ErrorImg } from "../assets/404.svg";

import "../css/PageNotFound.css";

function PageNotFound() {
  return (
    <div className="pnf-container">
      <div className="pnf-header">
        <h1 className="pnf-message">We couldn't find this page.</h1>
        <p className="pnf-description">
          You must've mistyped the url on your overly expensive custom
          mechanical keyboard, unless you're poor and have a prebuilt.
        </p>
      </div>

      <ErrorImg className="error-illustration" />
    </div>
  );
}

export default PageNotFound;
