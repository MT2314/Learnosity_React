import React, { useState, useContext } from "react";
import componentIndex from "../../../components/componentIndex";
import styled from "@emotion/styled";
import { LayoutContext, TabContext } from "../TabsMain";

// const InnerBox = styled("div")({
//   boxShadow: "0px 0px 0px 1px #E0E0E0",
//   borderRadius: 4,
//   padding: "8px 10px",
//   marginBottom: 18,
// });

// const ListItem = styled("li")(({ theme }) => ({
//   color: theme.palette.primary.main,
//   fontFamily: theme.typography.fontFamily,
//   listStyle: "none",
// }));

// const MockStateWrapper = ({ Component, componentState, compIndex }) => {
//   const [state, dispatch] = useContext(LayoutContext);
  

//   console.log(activeTab);
//   return (
//     <Component
//       setProp={() => {
//         dispatch({
//           func: "UPDATE_COMPONENT",
//           compIndex: compIndex,
//           tabIndex: activeTab,
//           componentState: componentState,
//         });
//       }}
//     />
//   );
// };

const TabComponent = ({ component, compIndex }) => {
  console.log(`component is tabComponent:`, component);

  const [state, dispatch] = useContext(LayoutContext);
  const [activeTab, setActiveTab] = useContext(TabContext);

  const {componentName, componentProps} = component

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[componentName]

  const { Component } = componentDetails;


  return (
    <li key={`comp-${compIndex}`}>
      <Component setProp={() => {
        dispatch({
          func: "UPDATE_COMPONENT",
          compIndex: compIndex,
          tabIndex: activeTab,
          component: component.componentState,
        });
      }} {...componentProps} />
    </li>
  );
};
export default TabComponent;
