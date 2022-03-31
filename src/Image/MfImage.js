import React from "react";
import styles from "./MfImage.module.scss";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import background from './assets/imageIcon.svg';

const MfImage = () => {

   return(
      <div className={styles.Image__holdingbox}>
          <div 
            className={styles.Image__outline}
            tabIndex="0"
          ></div>
          <textarea
            placeholder="Type caption here..."
            aria-label="Add caption text to image"
            rows={2}
            className={styles.Image__caption}
          ></textarea>
        </div>
   )
}

export default MfImage;