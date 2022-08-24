import React, { useRef, useState, useEffect, useContext } from "react";
import {
  useQuill,
  useSetShowMath,
  useUniqueId,
  useEditFormula,
  useSetEditFormula,
} from "../../../Provider";

import { InlineMath } from "react-katex";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useOnClickOutside } from "../../../../../hooks/useOnClickOutside";

import MathLiveEditor from "./MathLiveEditor";
import "../../../styles/MathEquation.scss";

import Basic from "./keys/Basic";
import Operator from "./keys/Operator";
import Arrows from "./keys/Arrows";
import Greek from "./keys/Greek";
import Sets from "./keys/Sets";
import Trig from "./keys/Trig";

const btnStyles = {
  display: "inline-block",
  textAlign: "center",
  width: "50px",
  background: "white",
  borderRadius: 3,
  border: 1,
  color: "black",
  height: 40,
  padding: "5px 5px",
  boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5",
  letterSpacing: "0.00938em",
  textTransform: "none",
  cursor: "pointer",
};

const regularBtns = {
  ...btnStyles,
  width: "80px",
};

const style = {
  position: "fixed",
  width: "800px",
  height: "contain",
  border: "1px solid black",
  top: "125px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2000,
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
};

const container = {
  border: "1px solid black",
  height: "100px",
  padding: "0 8px",
  borderRadius: "5px",
  zIndex: 2010,
};

const MathPopup = () => {
  const quill = useQuill();
  const setMathShow = useSetShowMath();
  const uniqueId = useUniqueId();
  const editFormula = useEditFormula();
  const setEditFormula = useSetEditFormula();

  const isEdit = Boolean(editFormula.value);

  const [value, setValue] = useState("1");

  const mathfield = useRef(null);
  const containerRef = useRef(null);

  const tabs = [
    { label: "Basic", render: Basic },
    { label: "Operator", render: Operator },
    { label: "Greek", render: Greek },
    { label: "Sets", render: Sets },
    { label: "Trig", render: Trig },
  ];

  const closeMath = () => {
    setEditFormula({ value: null, id: null });
    setMathShow(false);
  };

  useOnClickOutside(containerRef, closeMath);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    if (isEdit) {
      const ops = quill.getContents().ops;

      const index = ops.findIndex(
        (delta) => delta?.attributes?.id === editFormula.id
      );

      quill.deleteText(index, 1);
      quill.insertEmbed(
        index,
        "mathpix",
        mathfield.current.getValue("latex-expanded")
      );

      quill.setSelection(index + 1);
      setEditFormula({ value: null, id: null });
    } else {
      const range = quill.getSelection(true);
      quill.deleteText(range.index, range.length);
      quill.insertEmbed(
        range.index,
        "mathpix",
        mathfield.current.getValue("latex-expanded")
      );
      quill.insertText(range.index + range.length + 1, " ");
      quill.setSelection(range.index + range.length + 1);
    }

    closeMath();
  };

  useEffect(() => {
    document.body.style.setProperty("--selection-background-color", "#A1CAF1");
    document.body.style.setProperty("--placeholder-color", "#000000");
    document.body.style.setProperty("--selection-color", "#000000");

    isEdit && mathfield.current.setValue(editFormula.value);

    mathfield.current.setOptions({
      mathModeSpace: "\\:",
      plonkSound: false,
      keypressSound: false,
    });
    containerRef.current.click();
    mathfield.current.focus();
  }, []);

  return (
    <div style={style} ref={containerRef} id={`mathpopup-${uniqueId}`}>
      <div>
        <MathLiveEditor style={container} ref={mathfield} />
      </div>
      <div>
        <Grid container columns={12} direction="row" sx={{ marginTop: "10px" }}>
          <Grid item xs={9}>
            <Box
              sx={{ width: "100%", typography: "body1", maxHeight: "400px" }}
            >
              <TabContext value={value}>
                <TabList onChange={handleChange}>
                  {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} value={`${index + 1}`} />
                  ))}
                </TabList>
                {tabs.map((tab, index) => (
                  <TabPanel key={index} value={`${index + 1}`}>
                    <Grid
                      container
                      spacing={1}
                      columns={12}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {tab.render.map((btn, index) => (
                        <Grid item key={index}>
                          <button
                            style={btnStyles}
                            onClick={(e) => {
                              e.preventDefault();
                              mathfield.current.insert(
                                btn?.insert ? btn.insert : btn.text
                              );
                              mathfield.current.executeCommand(
                                "moveAfterParent"
                              );
                              mathfield.current.focus();
                            }}
                          >
                            <InlineMath math={btn.text} />
                          </button>
                        </Grid>
                      ))}
                    </Grid>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                maxHeight: "400px",
              }}
            >
              <Grid
                container
                spacing={1}
                columns={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {["Space", "Backspace"].map((btn, index) => (
                  <Grid item key={index}>
                    <button
                      style={regularBtns}
                      onClick={(e) => {
                        e.preventDefault();
                        mathfield.current.executeCommand(
                          btn === "Space" ? ["insert", "\\:"] : "deleteBackward"
                        );
                        mathfield.current.focus();
                      }}
                    >
                      <InlineMath
                        math={
                          btn !== "Space"
                            ? "\\longleftarrow"
                            : "\\llcorner\\lrcorner"
                        }
                      />
                    </button>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                maxHeight: "400px",
                marginTop: "30px",
              }}
            >
              <Grid
                container
                spacing={1}
                columns={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {Arrows.map((btn, index) => (
                  <Grid
                    item
                    key={index}
                    xs={index === 0 ? 4 : 1}
                    sx={{
                      display: "flex",
                      direction: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={btnStyles}
                      onClick={(e) => {
                        e.preventDefault();
                        mathfield.current.executeCommand(btn.command);
                        mathfield.current.focus();
                      }}
                    >
                      <InlineMath math={btn.text} />
                    </button>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                maxHeight: "400px",
                marginTop: "20px",
              }}
            >
              <Grid
                container
                spacing={1}
                columns={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((btn, index) => (
                  <Grid item key={index}>
                    <button
                      style={btnStyles}
                      onClick={(e) => {
                        e.preventDefault();
                        mathfield.current.insert(`${btn}`);
                        mathfield.current.focus();
                      }}
                    >
                      <InlineMath math={`${btn}`} />
                    </button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={1}
        columns={3}
        direction="row"
        justifyContent="end"
        alignItems="center"
        sx={{ marginTop: "10px" }}
      >
        <Grid item>
          <button style={regularBtns} onClick={handleClick}>
            {isEdit ? "Update" : "Insert"}
          </button>
        </Grid>
        <Grid item>
          <button style={regularBtns} onClick={closeMath}>
            Close
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MathPopup;
