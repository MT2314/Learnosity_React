import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { ToolBarDropDowns } from "../CustomToolBar";

const BoldDropdownButton = ({ show }) => {
  const [activeInlineOptions, setActiveInlineOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    sub: false,
    superscript: false,
  });

  const icons = ReactQuill.Quill.import("ui/icons");
  icons["bold"] = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
    >
      <path
        d="M9.2 7.26372C10.2377 6.54698 10.9651 5.37023 10.9651 4.27907C10.9651 1.8614 9.09302 0 6.68605 0H0V14.9767H7.53116C9.76698 14.9767 11.5 13.1581 11.5 10.9223C11.5 9.29628 10.58 7.90558 9.2 7.26372ZM3.2093 2.67442H6.4186C7.30651 2.67442 8.02326 3.39116 8.02326 4.27907C8.02326 5.16698 7.30651 5.88372 6.4186 5.88372H3.2093V2.67442ZM6.95349 12.3023H3.2093V9.09302H6.95349C7.8414 9.09302 8.55814 9.80977 8.55814 10.6977C8.55814 11.5856 7.8414 12.3023 6.95349 12.3023Z"
        className="svg-fill"
      />
    </svg>
  );

  icons["italic"] = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
    >
      <path
        d="M4.5 0V3.375H6.98625L3.13875 12.375H0V15.75H9V12.375H6.51375L10.3612 3.375H13.5V0H4.5Z"
        className="svg-fill"
      />
    </svg>
  );

  icons["underline"] = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
    >
      <path
        d="M7 14C10.31 14 13 11.31 13 8V0H10.5V8C10.5 9.93 8.93 11.5 7 11.5C5.07 11.5 3.5 9.93 3.5 8V0H1V8C1 11.31 3.69 14 7 14ZM0 16V18H14V16H0Z"
        className="svg-fill"
      />
    </svg>
  );

  icons["strike"] = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
    >
      <path
        d="M4.35778 5.90972C4.09056 5.41639 3.95694 4.85111 3.95694 4.19333C3.95694 3.56639 4.09056 3.00111 4.36806 2.47694C4.63528 1.96306 5.01556 1.52111 5.50889 1.15111C6.00222 0.791389 6.58806 0.503611 7.25611 0.298056C7.93444 0.102778 8.68472 0 9.49667 0C10.3292 0 11.0794 0.113055 11.7681 0.349444C12.4464 0.575555 13.0322 0.904445 13.505 1.31556C13.9881 1.72667 14.3581 2.22 14.615 2.78528C14.8719 3.35056 15.0056 3.96722 15.0056 4.64556H11.9119C11.9119 4.32694 11.8606 4.03917 11.7578 3.77194C11.6653 3.49444 11.5111 3.26833 11.3056 3.07306C11.1 2.87778 10.8431 2.73389 10.5347 2.62083C10.2264 2.51806 9.85639 2.45639 9.44528 2.45639C9.04444 2.45639 8.68472 2.4975 8.38667 2.59C8.08861 2.6825 7.84194 2.80583 7.64667 2.96C7.45139 3.12444 7.29722 3.30944 7.19444 3.52528C7.09167 3.74111 7.04028 3.96722 7.04028 4.20361C7.04028 4.69694 7.29722 5.10806 7.80083 5.44722C8.19139 5.70417 8.59222 5.94056 9.25 6.16667H4.51194C4.46056 6.08444 4.39889 5.99194 4.35778 5.90972ZM18.5 9.25V7.19444H0V9.25H9.88722C10.0722 9.32194 10.2983 9.39389 10.4525 9.45556C10.8328 9.63028 11.1308 9.805 11.3467 9.97972C11.5625 10.1544 11.7064 10.3497 11.7886 10.5656C11.8606 10.7711 11.9017 11.0075 11.9017 11.2747C11.9017 11.5111 11.8503 11.7372 11.7578 11.9531C11.6653 12.1586 11.5214 12.3436 11.3261 12.4978C11.1308 12.6519 10.8944 12.765 10.5964 12.8575C10.2983 12.9397 9.94889 12.9911 9.55833 12.9911C9.11639 12.9911 8.70528 12.95 8.34556 12.8575C7.98583 12.765 7.66722 12.6211 7.41028 12.4258C7.15333 12.2306 6.94778 11.9736 6.80389 11.655C6.66 11.3364 6.54694 10.8739 6.54694 10.4114H3.49444C3.49444 10.9767 3.57667 11.5728 3.74111 12.0353C3.90556 12.4978 4.12139 12.9089 4.40917 13.2789C4.69694 13.6386 5.02583 13.9572 5.41639 14.2244C5.79667 14.4917 6.21806 14.7178 6.67028 14.8925C7.1225 15.0672 7.59528 15.2008 8.08861 15.2933C8.58194 15.3756 9.07528 15.4269 9.56861 15.4269C10.3908 15.4269 11.1411 15.3344 11.8092 15.1392C12.4772 14.9439 13.0528 14.6767 13.5256 14.3272C13.9983 13.9778 14.3683 13.5358 14.6253 13.0219C14.8822 12.5081 15.0158 11.9222 15.0158 11.2644C15.0158 10.6478 14.9131 10.0928 14.6972 9.60972C14.6458 9.49667 14.5842 9.37333 14.5225 9.27056H18.5V9.25Z"
        className="svg-fill"
      />
    </svg>
  );

  icons["script"] = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
    >
      <path
        d="M16.9999 14H14.9999V15H17.9999V16H13.9999V14C13.9999 13.45 14.4499 13 14.9999 13H16.9999V12H13.9999V11H16.9999C17.5499 11 17.9999 11.45 17.9999 12V13C17.9999 13.55 17.5499 14 16.9999 14ZM0.879883 14H3.53988L6.93988 8.58H7.05988L10.4599 14H13.1199L8.46988 6.73L12.8099 0H10.1299L7.05988 4.99H6.93988L3.84988 0H1.18988L5.50988 6.73L0.879883 14Z"
        className="svg-fill"
      />
    </svg>
  );

  icons["super"] = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
    >
      <path
        d="M16.9999 3H14.9999V4H17.9999V5H13.9999V3C13.9999 2.45 14.4499 2 14.9999 2H16.9999V1H13.9999V0H16.9999C17.5499 0 17.9999 0.45 17.9999 1V2C17.9999 2.55 17.5499 3 16.9999 3ZM0.879883 16H3.53988L6.93988 10.58H7.05988L10.4599 16H13.1199L8.46988 8.73L12.8099 2H10.1299L7.05988 6.99H6.93988L3.84988 2H1.18988L5.50988 8.73L0.879883 16Z"
        className="svg-fill"
      />
    </svg>
  );

  const [activeDropdownItem, setActiveDropdownItem] =
    useContext(ToolBarDropDowns);

  console.log(activeInlineOptions);

  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"}>
        <button
          aria-label="bold"
          className="ql-bold"
          onClick={() => {
            if (activeDropdownItem === "bold") {
              setActiveDropdownItem("");
              setActiveInlineOptions({ ...activeInlineOptions, bold: false });
            } else {
              setActiveDropdownItem("bold");
              setActiveInlineOptions({ ...activeInlineOptions, bold: true });
            }
          }}
        >
          {icons["bold"]}
        </button>
        <button
          aria-label="italic"
          className="ql-italic"
          onClick={() => {
            if (activeDropdownItem === "italic") {
              setActiveDropdownItem("");
              setActiveInlineOptions({ ...activeInlineOptions, italic: false });
            } else {
              setActiveDropdownItem("italic");
              setActiveInlineOptions({ ...activeInlineOptions, italic: true });
            }
          }}
        >
          {icons["italic"]}
        </button>
        <button
          aria-label="underline"
          className="ql-underline"
          onClick={() => {
            if (activeDropdownItem === "underline") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                underline: false,
              });
            } else {
              setActiveDropdownItem("underline");
              setActiveInlineOptions({
                ...activeInlineOptions,
                underline: true,
              });
            }
          }}
        >
          {icons["underline"]}
        </button>
        <button
          aria-label="strike"
          className="ql-strike"
          onClick={() => {
            if (activeDropdownItem === "strike") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                strike: false,
              });
            } else {
              setActiveDropdownItem("strike");
              setActiveInlineOptions({
                ...activeInlineOptions,
                strike: true,
              });
            }
          }}
        >
          {icons["strike"]}
        </button>
        <button
          aria-label="sub script"
          className="ql-script"
          value="sub"
          onClick={() => {
            if (activeDropdownItem === "sub") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                sub: false,
              });
            } else {
              setActiveDropdownItem("sub");
              setActiveInlineOptions({
                ...activeInlineOptions,
                sub: true,
                super: false,
              });
            }
          }}
        >
          {icons["script"]}
        </button>
        <button
          aria-label="super script"
          className="ql-script"
          value="super"
          onClick={() => {
            if (activeDropdownItem === "super") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                super: false,
              });
            } else {
              setActiveDropdownItem("super");
              setActiveInlineOptions({
                ...activeInlineOptions,
                super: true,
                sub: false,
              });
            }
          }}
        >
          {icons["super"]}
        </button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
