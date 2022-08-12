import React, { useContext, useCallback, useRef } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

import { TextareaAutosize } from "@material-ui/core";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const handleTitleChange = useCallback((e) => {
    dispatch({
      func: "CHANGE_TITLE",
      title: e.target.value,
      id: e.target.dataset.id,
    });
  }, []);

  const handleTitleBlur = (e) => {
    console.log("blur", e.target);
    e.target.style.overflow = "hidden";
    e.target.scrollTo(0, 0);
  };

  const inputRef = useRef();

  const handleCursorFocus = (i) => {
    inputRef.current.setSelectionRange(
      state[i].title.length,
      state[i].title.length
    );
    inputRef.current.focus();
    inputRef.current.scrollTo(state[i].title.length, state[i].title.length);
  };

  return (
    <div className="tab-container">
      {/* <button
        onClick={() =>
          dispatch({
            func: "ADD_TAB",
            id: state.length,
            title: `Tab ${state.length + 1}`,
          })
        }
      >
        add tab
      </button> */}

      <div className="tab-title-wrapper" role="tablist">
        {state.map((tabTitle, tabIndex) => {
          return (
            <div
              key={`tab-title-${tabIndex}`}
              role="tab"
              tabIndex="0"
              aria-label={
                state[tabIndex].title
                  ? state[tabIndex].title
                  : `Untitled Tab ${tabIndex + 1}`
              }
              className={`tab-title ${
                activeTab === tabIndex ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(tabIndex)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActiveTab(tabIndex);
                }
              }}
            >
              {activeTab == tabIndex ? (
                <TextareaAutosize
                  className="tab-title-input"
                  placeholder={`Tab ${tabIndex + 1}`}
                  aria-label="tab title input"
                  aria-multiline="true"
                  role={activeTab == tabIndex ? "textbox" : "tab"}
                  disabled={activeTab == tabIndex ? false : true}
                  contentEditable
                  minRows="1"
                  maxRows="2"
                  maxLength="200"
                  onChange={handleTitleChange}
                  onFocus={() => handleCursorFocus(tabIndex)}
                  data-id={tabIndex}
                  value={state[tabIndex].title}
                  onBlur={handleTitleBlur}
                  ref={inputRef}
                />
              ) : (
                <p
                  className="placeholder-title"
                  role="tab"
                  style={{
                    WebkitLineClamp: activeTab == tabIndex ? "unset" : 2,
                  }}
                >
                  {state[tabIndex].title
                    ? state[tabIndex].title
                    : `Tab ${tabIndex + 1}`}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {state.map((tab, tabIndex) => {
        return (
          <>
            {activeTab === tabIndex ? (
              <Tab tabIndex={tabIndex} tab={tab} />
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Tabs;
