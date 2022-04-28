import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import Callout from "./Callout/Callout.js";
import Header from "./Header";
import Image from "./Image/Image";
import ImageConfig from "./Image/ImageConfig";
import FormattedText from "./FormattedText";
import { ImageProvider, ImageWidgetContext } from "./Image/ImageProvider";

import "./index.css";

const TestingEnvUUIDSetting = () => {
  const componentContext = useContext(ImageWidgetContext);

  const handleChange = (e) => {
    const uuid = e.target.value
    if (!componentContext[uuid]){
      // TODO: needs a way to know which component default to add when multiples use context, but this is a problem specific to testing environment
      componentContext.updateContext({selectedUUID: uuid, [uuid]: {...componentContext.imageDefault}})
    } else {
      componentContext.updateContext({selectedUUID: uuid})
    }

  }

  return (
    <input value={componentContext.selectedUUID || ""} onChange={handleChange} />
  )
}

const App = () => {
  console.log("15.0.1")
  return (
    <>
      <Header title="component-library" backgroundColor="salmon" />
      <TestingEnvUUIDSetting />
      <div className="container" style={{ display: "flex" }}>
        <div className="canvas" style={{ border: "2px solid black" }}>
          <Image uuid="1" />
          <Callout />
          <Image uuid="2" />
          <FormattedText />
        </div>
        <div
          className="editPanel"
          style={{
            border: "2px solid black",
            marginLeft: "1em",
            padding: "10px",
          }}
        >
          <ImageConfig />
        </div>
      </div>
    </>
  );
};
ReactDOM.render(
  <ImageProvider testing>
    <App />
  </ImageProvider>,
  document.getElementById("app")
);
