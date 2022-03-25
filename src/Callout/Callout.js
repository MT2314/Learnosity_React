// This version of Callout is styled with CSS Modules

import React from "react";
import { Paper } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";

const Callout = (props) => {

  const {heading, body, calloutType} = props;
 
  return (
    <Paper aria-label="Callout" className={styles.Callout_main}>  
      <label htmlFor={`callout-type`} className={styles.Callout_label}>Callout Type</label>&nbsp;
      <NativeSelect autoFocus id={`callout-type`} value={calloutType||""} onChange={e => setProp(props => Object.assign(props, { calloutType: e.target.value }))} className={styles.Callout_type_dropdown}>
        <option value={""}>Select Value</option>
        <option value={""}>Challenge</option>
        <option value={""}>Notebook</option>
        <option value={""}>Try It</option>
        <option value={""}>Definition</option>
      </NativeSelect>
      <div className={styles.Callout_body_text} role="presentation">
        {/* decorative icon */}
        {calloutType ?
          (<img className={styles.Callout_img} alt={""} aria-label="Callout type icon"/>)
        : (<div className={styles.Callout_icon_placeholder} aria-label="Callout type icon placeholder"></div>)}
        <TextEditable placeholder="Callout heading text" onChange={e => setProp(props => Object.assign(props, { heading: e.target.value }))} className={styles.Callout_heading} value="Enter Heading" />
      </div>
        
        <TextEditable placeholder="Callout body text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { body: e.target.value }))} className={styles.Callout_body} value="Enter Body" />
    </Paper>
  )
}

export default Callout;