import React, { useState, useRef } from "react";

import { useOutsideToggle } from "../util/useOutsideToggle";
import Select from "../components/Select";
import { ReactComponent as FilterIcon } from "../assets/filter.svg";

import "../css/FilterPosts.css";

function FilterPosts({ dateType, postType, limit, changeReferrer }) {
  const [showPreferences, setShowPreferences] = useState(false);
  const filterRef = useRef();
  useOutsideToggle(filterRef, () => setShowPreferences(false));

  // these functions are separate because otherwise we'll need to pass dateType, postType, and limit into every child. This is an annoying example of props drilling and would be easier for the children if we create individual functions here.
  //
  // do we want to make it so whenever the user changes a preference it will close the menu? This would mean that to be able to make another change you'd have to click the icon to show the menu. By default, you'd have to click outside the menu when you're done changing preferences.
  const changeLimit = (newLimit) => {
    changeReferrer(`/posts/${dateType}/${postType}?page=1&limit=${newLimit}`);
    // setShowPreferences(false);
  };
  const changePostType = (newPostType) => {
    changeReferrer(`/posts/${dateType}/${newPostType}?page=1&limit=${limit}`);
    // setShowPreferences(false);
  };
  const changeDateType = (newDateType) => {
    changeReferrer(`/posts/${newDateType}/${postType}?page=1&limit=${limit}`);
    // setShowPreferences(false);
  };

  return (
    <div className="filter-container" ref={filterRef}>
      <FilterIcon
        className="filter-icon"
        onClick={() => setShowPreferences(!showPreferences)}
      />
      {showPreferences && (
        <div className="filter-menu">
          <div className="filter-item">
            Post Type:
            <Select
              listOptions={[
                { item: "Interest Checks", value: "interest-checks" },
                { item: "Group Buys", value: "group-buys" },
                { item: "All", value: "all" },
              ]}
              activeOption={
                (postType === "all" && "All") ||
                (postType === "interest-checks" && "Interest Checks") ||
                (postType === "group-buys" && "Group Buys")
              }
              applyChanges={changePostType}
            />
          </div>
          <div className="filter-item">
            Results Per Page
            <Select
              listOptions={[
                { item: 15, value: 15 },
                { item: 20, value: 20 },
                { item: 25, value: 25 },
                { item: 50, value: 50 },
              ]}
              activeOption={limit}
              applyChanges={changeLimit}
            />
          </div>
          <div className="filter-item">
            Filter Date
            <Select
              listOptions={[
                { value: "latest", item: "Latest" },
                { value: "newest", item: "Newest" },
              ]}
              activeOption={
                (dateType === "latest" && "Latest") ||
                (dateType === "newest" && "Newest")
              }
              applyChanges={changeDateType}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterPosts;
