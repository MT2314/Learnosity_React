import React, { useContext, useState } from "react";
import { Paper } from "@mui/material";
import styles from "./styles/Image.module.scss";
import { ImageWidgetContext } from "./ImageProvider";

const Image = () => {

   const context = useContext(ImageWidgetContext);
   const [ credit, setCredit ] = useState('')

   let imgSizeStyles = {};
	
   if (context.imgSize === "default") {
      imgSizeStyles = {
         width: 'auto'
      }
   } else if (context.imgSize === "small") {
      imgSizeStyles = {
         width: '256px'
      }
   } else if (context.imgSize === "medium") {
      imgSizeStyles = {
         width: '512px'
      }
   } else if (context.imgSize === "large") {
      imgSizeStyles = {
         width: '1024px'
      }
   };

   return(
      <Paper
         className={styles.Image__container}
         elevation={0}
      >
			<div className={styles.Image__canvasImgContainer}>
         {context.uploadedImg ? (
            // If image has been uploaded
            <>
            {/* add link to image */}
            {context.imgLink ?
               <a 
                  href={context.imgLink} 
                  className={styles.Image__imgLink}>
                  <img
                     src={context.uploadedImg}
                     alt={context.alt}
                     className={styles.Image__img}
                     style={imgSizeStyles}
                  />
               </a>
               :
               // no link added to img
               <>
               <img
                  src={context.uploadedImg}
                  alt={context.alt}
                  className={styles.Image__img}
                  tabIndex="0"
                  style={imgSizeStyles}
               />
            	</>
            }
            </>
            ) : (
            // If no image has been uploaded
            <>
               <div className={styles.Image__outline} tabIndex="0"></div>
            </>
            )
         }
         {
            context.longDesc &&
            <p className={styles.Image__longDesc}>{context.longDesc}</p>
         }
            <label htmlFor='caption' className={styles.srOnly}>Enter caption for image</label>
				<textarea
               name="caption"
               id="caption"
         	   placeholder="Type caption here..."
         	   aria-label="Add caption text to image"
         	   rows={2}
         	   className={styles.Image__caption}
         	></textarea>

         	<label hmtlFor='credit' className={styles.srOnly}>Enter credit for image</label>
         	<input
					type="text"
         	   name="credit"
         	   id="credit"
         	   value={credit}
         	   placeholder="Add image credit..."
               aria-label="Add credit text to image"
         	   className={styles.Image__caption}
         	   onChange={e => setCredit(e.target.value)}
         	/>
			</div>
      </Paper>
   );
};

export default Image;