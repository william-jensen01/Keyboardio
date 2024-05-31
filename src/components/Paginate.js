import React from "react";

import "../css/Paginate.css";

function Paginate({ totalPageCount, currentPage, changePage }) {
	let lastPage = totalPageCount;
	const firstPage = 1;

	let paginateNums = [];
	const siblingCount = 1;
	const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
	const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

	const showLeftDots = leftSiblingIndex > 2;
	const showRightDots = rightSiblingIndex < lastPage - 2;

	const range = (start, end) => {
		let length = end - start + 1;
		return Array.from({ length }, (e, i) => i + start);
	};

	if (!showLeftDots && showRightDots) {
		let leftItemCount = 3 + 2 * siblingCount;
		let leftRange = range(1, leftItemCount);
		paginateNums = [...leftRange, "DOTS", lastPage];
	}
	if (showLeftDots && showRightDots) {
		let middleRange = range(leftSiblingIndex, rightSiblingIndex);
		paginateNums = [firstPage, "DOTS", ...middleRange, "DOTS", lastPage];
	}
	if (showLeftDots && !showRightDots) {
		let rightItemCount = 3 + 2 * siblingCount;
		let rightRange = range(lastPage - rightItemCount + 1, lastPage);
		paginateNums = ["DOTS", ...rightRange];
	}
	if (!showLeftDots && !showRightDots) {
		paginateNums = Array.from({ length: totalPageCount }, (_, i) => i + 1);
	}

	return (
		<div className="paginate-container">
			<button className={`paginate-btn`} onClick={() => changePage(firstPage)}>
				«
			</button>
			{paginateNums.map((page, e) => {
				if (page === "DOTS") {
					return (
						<button className="paginate-more" key={e}>
							...
						</button>
					);
				} else {
					return (
						<button
							key={e}
							className={`paginate-${
								page === Number(currentPage) ? "current" : "btn"
							}`}
							onClick={() => changePage(page)}
						>
							{page === Number(currentPage) ? `[${page}]` : page}
						</button>
					);
				}
			})}
			<button className={`paginate-btn`} onClick={() => changePage(lastPage)}>
				»
			</button>
		</div>
	);
}

export default Paginate;
