import React from "react";

const leftAlignSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z"
      fill="#232323"
    />
  </svg>
);

const AlignmentDropdown = () => {
  return (
    <>
      <button>{leftAlignSVG}</button>
      <div></div>
    </>
  );
};

export default AlignmentDropdown;
