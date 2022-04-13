import React, {useState, useEffect, createContext, useContext} from 'react';

export const ImageWidgetContext = createContext();

export function ImageProvider({children}){
  const inputs = {
    alt: "",
    imgLink:"",
    uploadedImg: "",
    updateContext: (contextUpdates) => {
      setUserInfo((currentContextInfo) => ({...currentContextInfo, ...contextUpdates}))
    }
  }
  const [ userInfo, setUserInfo ] = useState(inputs)

  return (
        <ImageWidgetContext.Provider value={userInfo}>
          {children}
        </ImageWidgetContext.Provider>
      )
}