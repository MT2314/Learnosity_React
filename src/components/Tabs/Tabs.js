import React, { useState } from "react";

import inlineConfig from "./utility/inlineConfig";
import FormattedText from "../FormattedText";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [
    {
      tabLabel: "Geography",
      components: [<FormattedText toolbar={inlineConfig} placeholderText="Type stuff here..."/>],
    },
    {
      tabLabel: "Science",
      components: [<FormattedText toolbar={inlineConfig}/>, <FormattedText toolbar={inlineConfig}/>],
    },
  ],
};


const Section = ({ tabTitle, id, handleOnClick, children }) => {
  return (
   <div id="tab-section" onClick={() => handleOnClick(id)}>
     <input 
      type="text"
      value={tabTitle}
     />
     {children}
   </div>
  );
};

const TabConfig = ({data, setProp}) => {

  const [ title, setTitle ] = useState("++");
  const [ content, setContent ] = useState(null);

   console.log( data , setProp)

   //create form 
   //1. input to add title
   //2. select to add component
   //3. update data

   return (
     <>
     <form>
       <input type="text" value={title} onChange={(e) => setProp() }/>
       <label for="cars">Add Component:</label>
       <select 
        name="components" 
        id="components" 
        form="components"
        onChange={(e) => setContent(e.target.value)}>
         <option value="">Select Content</option>
         <option value="formattedText">Text Box</option>
         <option value="image">Image</option>
         <option value="video">Video</option>
       </select>
     </form>

     {
       content === "formattedText" && <FormattedText/>
     }

     </>


   );
}


const Tabs = ({
  type = "tabs",
  tabsIntroduction = null,
  tabs,
  setProp = () => {},
}) => {

   const [ activeIndex, setActiveIndex ]= useState(0)

   const handleOnClick = (id) => {
      setActiveIndex(id)
   }

   const _tabContent = tabs[activeIndex].components.map(( component ) => {
      return component
   })
  
  return (
     <div style={{display:"flex"}}>
        {tabs.map((tab, index) => {
          return (
            <Section tabTitle={tab.tabLabel} id={index} handleOnClick={handleOnClick}>
               { index === activeIndex && _tabContent }       
            </Section>
          );
        })} 
       <TabConfig data={tabs} setProp={setProp}/>   
     </div>

  );
};

export default Tabs;
