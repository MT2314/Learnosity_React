import React, { useState } from "react";
import { Divider } from "@mui/material/";
import { Tooltip } from "@material-ui/core/";
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import icons from "../assets/icons";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";
// Config styles of MUI components
import { makeStyles } from "@material-ui/core/styles";

// Classes for styling modification. (Tooltip class)
const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(112, 112, 112, 0.9)",
  },
}));

const CustomToolBar = ({ toolbarId, containerId }) => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [visibleAlignIcon, setVisibleAlignIcon] = useState(icons["align"]);
  // Allow the use of materialUI styled component classes
  let classes = useStyles();

  const parentDiv = document.getElementById(containerId);
  if (parentDiv) {
    const QLformats = parentDiv.querySelector(`.ql-formats`);
    const QLactive = QLformats.querySelector(`.ql-active`);
    const options = {
      attributes: true,
    };

    function callback(mutationList) {
      mutationList.forEach(function (mutation) {
        if (mutation.target.classList.contains(`ql-active`)) {
          setVisibleAlignIcon(
            icons[mutation.target.value ? mutation.target.value : "align"]
          );
        }
      });
    }
    const observer = new MutationObserver(callback);
    observer.observe(QLactive, options);
  }

  return (
    <div id={toolbarId} className="toolbarContainer">
      {/* bold dropdown starts */}
      <Tooltip
        arrow
        title="font styles"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <button
          onClick={() => {
            setBoldVisibility(!boldVisibility);
            setAlignVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "bold") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("bold");
            }
            setActiveDropDownItem("");
          }}
          aria-label="formatting button dropdown"
          className={
            activeTopMenu === "bold"
              ? "bold-dropdown-button ql-selected ql-active"
              : "bold-dropdown-button"
          }
        >
          {icons["customBold"]}
        </button>
      </Tooltip>
      <BoldDropdownButton
        show={boldVisibility}
        aria-label="formatting options select dropdown"
        className="dropdown-content"
      ></BoldDropdownButton>

      {/* formula btn */}
      <Tooltip
        arrow
        title="equation"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <button
          className={
            activeTopMenu === "math"
              ? "ql-formula ql-selected ql-active"
              : "ql-formula"
          }
          aria-label="math equation button"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "math") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("math");
            }
            setActiveDropDownItem("");
          }}
        >
          {icons["formula"]}
        </button>
      </Tooltip>

      {/* alignment dropdown */}
      <Tooltip
        arrow
        title="alignment"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <button
          onClick={() => {
            setAlignVisibility(!alignVisibility);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "align") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("align");
            }
            setActiveDropDownItem("");
          }}
          className={
            activeTopMenu === "align"
              ? "align-button ql-selected ql-active"
              : "align-button"
          }
          aria-label="alignment buttons dropdown"
          value={visibleAlignIcon}
          id="alignment-dropdown"
        >
          {visibleAlignIcon}
        </button>
      </Tooltip>
      <AlignDropdownButton
        show={alignVisibility}
        className="dropdown-content"
        aria-label="alignment buttons options"
        activeDropDownItem={activeDropDownItem}
        setActiveDropDownItem={setActiveDropDownItem}
        setVisibleAlignIcon={setVisibleAlignIcon}
      />

      {/* bullets drowdown starts */}
      <Tooltip
        arrow
        title="add list"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <button
          onClick={() => {
            setListVisibility(!listVisibility);
            setAlignVisibility(false);
            setBoldVisibility(false);
            if (activeTopMenu === "lists") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("lists");
            }
            setActiveDropDownItem("");
          }}
          className={activeTopMenu === "lists" ? "ql-selected ql-active" : null}
          value="bullet"
          aria-label="list options select group"
        >
          {icons["bullet"]}
        </button>
      </Tooltip>
      <ListDropdownButton
        show={listVisibility}
        className="dropdown-content"
        aria-label="list buttons dropdown"
        activeDropDownItem={activeDropDownItem}
        setActiveDropDownItem={setActiveDropDownItem}
      ></ListDropdownButton>

      {/* link btn and divider */}
      <Divider orientation="vertical" />
      <Tooltip
        arrow
        title="insert link"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <button
          aria-label="add link button"
          className={
            activeTopMenu === "link"
              ? "ql-link ql-selected ql-active"
              : "ql-link"
          }
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "link") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("link");
            }
            setActiveDropDownItem("link");
          }}
        >
          {icons["link"]}
        </button>
      </Tooltip>
    </div>
  );
};

export default CustomToolBar;
