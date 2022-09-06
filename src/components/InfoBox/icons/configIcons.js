import React from 'react';
import ReactQuill from 'react-quill';

const icons = ReactQuill.Quill.import('ui/icons');

// Custom bold with underline symbol from design
icons['customBold'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.2 10.2637C16.2377 9.54698 16.9651 8.37023 16.9651 7.27907C16.9651 4.8614 15.093 3 12.686 3H6V17.9767H13.5312C15.767 17.9767 17.5 16.1581 17.5 13.9223C17.5 12.2963 16.58 10.9056 15.2 10.2637ZM9.2093 5.67442H12.4186C13.3065 5.67442 14.0233 6.39116 14.0233 7.27907C14.0233 8.16698 13.3065 8.88372 12.4186 8.88372H9.2093V5.67442ZM12.9535 15.3023H9.2093V12.093H12.9535C13.8414 12.093 14.5581 12.8098 14.5581 13.6977C14.5581 14.5856 13.8414 15.3023 12.9535 15.3023Z"
      className="svg-fill"
    />
    <rect x="6" y="19" width="11" height="2" className="svg-fill" />
  </svg>
);

// Inline configuration icons (bold, italic, underline, strike, sub, super)
icons['bold'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="currentColor"
    stroke="currentColor"
  >
    <path
      d="M9.2 7.26372C10.2377 6.54698 10.9651 5.37023 10.9651 4.27907C10.9651 1.8614 9.09302 0 6.68605 0H0V14.9767H7.53116C9.76698 14.9767 11.5 13.1581 11.5 10.9223C11.5 9.29628 10.58 7.90558 9.2 7.26372ZM3.2093 2.67442H6.4186C7.30651 2.67442 8.02326 3.39116 8.02326 4.27907C8.02326 5.16698 7.30651 5.88372 6.4186 5.88372H3.2093V2.67442ZM6.95349 12.3023H3.2093V9.09302H6.95349C7.8414 9.09302 8.55814 9.80977 8.55814 10.6977C8.55814 11.5856 7.8414 12.3023 6.95349 12.3023Z"
      className="svg-fill"
    />
  </svg>
);

icons['italic'] = (
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

icons['underline'] = (
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

icons['strike'] = (
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

// "script" is used for subscript/"super" for superscript
icons['script'] = (
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

icons['super'] = (
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

// Formula
icons['formula'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className="ql-formula"
  >
    <path
      d="M0.321167 5.7144L0.953631 5.76125C1.60952 5.01947 1.86719 2.82537 5.73225 3.25482C5.5917 12.6559 1.46897 13.6475 1.72664 15.5762C1.82034 16.6693 2.68705 17.3408 3.62403 17.3798C6.58334 17.2783 6.4506 13.2884 7.37197 3.2314H11.1902C10.9872 6.77632 10.4328 10.3212 10.3703 13.7959C10.4172 16.1071 11.8226 17.3408 13.6732 17.3564C16.7184 17.4579 17.6788 13.9052 17.6788 12.3904H17.0229C16.9604 13.6397 16.3592 14.5377 15.0787 14.5923C11.5884 14.6392 13.5092 8.45508 13.5326 3.27825L17.6788 3.30167L17.6554 0.654692C0.422354 0.571215 2.60971 0.233369 0.321167 5.7144Z"
      className="svg-fill"
    />
  </svg>
);

// Alignment ("align" is default for left-alignment)
icons['align'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    stroke="currentColor"
  >
    <path
      d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z"
      className="svg-fill"
    />
  </svg>
);

icons['center'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M3.55556 10.6667V12.4444H12.4444V10.6667H3.55556ZM0 16H16V14.2222H0V16ZM0 8.88889H16V7.11111H0V8.88889ZM3.55556 3.55556V5.33333H12.4444V3.55556H3.55556ZM0 0V1.77778H16V0H0Z"
      className="svg-fill"
    />
  </svg>
);

icons['right'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M0 16H16V14.2222H0V16ZM5.33333 12.4444H16V10.6667H5.33333V12.4444ZM0 8.88889H16V7.11111H0V8.88889ZM5.33333 5.33333H16V3.55556H5.33333V5.33333ZM0 0V1.77778H16V0H0Z"
      className="svg-fill"
    />
  </svg>
);

// Lists
icons['bullet'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="16"
    viewBox="0 0 19 16"
    fill="none"
  >
    <path
      d="M2 6.5C1.17 6.5 0.5 7.17 0.5 8C0.5 8.83 1.17 9.5 2 9.5C2.83 9.5 3.5 8.83 3.5 8C3.5 7.17 2.83 6.5 2 6.5ZM2 0.5C1.17 0.5 0.5 1.17 0.5 2C0.5 2.83 1.17 3.5 2 3.5C2.83 3.5 3.5 2.83 3.5 2C3.5 1.17 2.83 0.5 2 0.5ZM2 12.5C1.17 12.5 0.5 13.18 0.5 14C0.5 14.82 1.18 15.5 2 15.5C2.82 15.5 3.5 14.82 3.5 14C3.5 13.18 2.83 12.5 2 12.5ZM5 15H19V13H5V15ZM5 9H19V7H5V9ZM5 1V3H19V1H5Z"
      className="svg-fill"
    />
  </svg>
);

icons['ordered'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="16"
    viewBox="0 0 19 16"
    fill="none"
  >
    <path
      d="M0 13H2V13.5H1V14.5H2V15H0V16H3V12H0V13ZM1 4H2V0H0V1H1V4ZM0 7H1.8L0 9.1V10H3V9H1.2L3 6.9V6H0V7ZM5 1V3H19V1H5ZM5 15H19V13H5V15ZM5 9H19V7H5V9Z"
      className="svg-fill"
    />
  </svg>
);

// Link
icons['link'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="10"
    viewBox="0 0 20 10"
    fill="none"
  >
    <path
      d="M15 0H11V2H15C16.65 2 18 3.35 18 5C18 6.65 16.65 8 15 8H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0ZM9 8H5C3.35 8 2 6.65 2 5C2 3.35 3.35 2 5 2H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8ZM6 4H14V6H6V4Z"
      className="svg-fill"
    />
  </svg>
);

// Edit pencil
icons['edit'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
  >
    <path
      d="M11.06 6.02L11.98 6.94L2.92 16H2V15.08L11.06 6.02ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z"
      className="svg-fill"
    />
  </svg>
);

// Delete garbage icon
icons['delete'] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
  >
    <path
      d="M11 6V16H3V6H11ZM9.5 0H4.5L3.5 1H0V3H14V1H10.5L9.5 0ZM13 4H1V16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4Z"
      className="svg-fill"
    />
  </svg>
);

icons['trashcan'] = (
  <svg
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 6V16H3V6H11ZM9.5 0H4.5L3.5 1H0V3H14V1H10.5L9.5 0ZM13 4H1V16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4Z"
      fill="currentColor"
    />
  </svg>
);

icons['pencil'] = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.06 6.02L11.98 6.94L2.92 16H2V15.08L11.06 6.02V6.02ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0V0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19V3.19Z"
      fill="currentColor"
    />
  </svg>
);

export default icons;
