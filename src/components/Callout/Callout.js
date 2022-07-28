import React, { useState, useRef } from "react";
import { Paper, NativeSelect } from "@mui/material";
import styles from "./styles/Callout.module.scss";
import FormattedText from "../FormattedText/FormattedText";
import { useToolBarOptions } from "../../hooks/useToolBarOptions";
import calloutOptions from "./utility/CalloutOptions";

import "./i18n";
import { useTranslation, Trans } from "react-i18next";

export const defaultProps = { heading: "", body: "" };

const lngs = {
  en: { nativeName: "English" },
  fr: { nativeName: "French" },
  cn: { nativeName: "Chinese" },
  es: { nativeName: "Spanish" },
};

const Callout = ({
  calloutTypeSvg,
  calloutTitle,
  calloutBody,
  setProp = () => {},
}) => {
  let labelId = Math.floor(Math.random() * 100000);

  const calloutToolBar = useToolBarOptions(
    ["inline", "link", "list"],
    ["bold", "italic", "underline", "strikethrough"]
  );

  const { t, i18n } = useTranslation();
  const [textEditorRef, setTextEditorRef] = useState();
  const lngRef = useRef([]);

  function lngFunction(lng) {
    i18n.changeLanguage(lng);
    textEditorRef?.focus({ preventScroll: true });
    lngRef.current[lng].focus({ preventScroll: true });
  }

  return (
    <Paper
      aria-label="Callout"
      data-id="callout"
      data-testid="callout"
      className={styles.Callout_container}
    >
      <div className={styles.dropdownContainer}>
        <label id={`callout-${labelId}`} className={styles.Callout_label}>
          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                ref={(el) => (lngRef.current[lng] = el)}
                type="submit"
                key={lng}
                onClick={() => lngFunction(lng)}
                disabled={i18n.resolvedLanguage === lng}
                aria-label={lngs[lng].nativeName}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
          {t("callout")}&nbsp;
          <NativeSelect
            role="listbox"
            autoFocus
            name="callout-selector"
            aria-labelledby={`callout-${labelId}`}
            data-testid="calloutTitle"
            onChange={(e) => {
              setProp({
                calloutTypeSvg: calloutOptions[e.target.value].iconUrl,
              });
              setProp({ calloutTitle: calloutOptions[e.target.value].title });
            }}
            className={styles.Callout_type_dropdown}
          >
            {calloutOptions.map(({ type_id, title }) => (
              <option key={type_id} value={calloutOptions[type_id].type_id}>
                {t(title)}
              </option>
            ))}
          </NativeSelect>
        </label>
      </div>
      &nbsp;
      <div className={styles.Callout_icon_title} data-testid="calloutTypeSvg">
        {/* decorative icon */}
        {calloutTypeSvg ? (
          <>
            <img
              className={styles.Callout_img}
              src={calloutTypeSvg}
              alt={""}
              aria-label={t("imgAriaLabel")}
            />
            <p data-testid="calloutTitle" className={styles.Callout_heading}>
              {t(calloutTitle)}
            </p>
          </>
        ) : (
          <div
            className={styles.Callout_icon_placeholder}
            aria-label={t("imgAriaLabelDiv")}
          ></div>
        )}
      </div>
      <div className={styles.Callout_text_area} data-testid="calloutBody">
        <FormattedText
          placeHolderText={t("calloutPlaceHolderText")}
          toolbar={calloutToolBar}
          body={calloutBody}
          className={styles.Callout_body}
          editorClassName="callout_editor_class"
          setProp={(stateUpdate) => setProp({ calloutBody: stateUpdate.body })}
          editorRef={(ref) => {
            !textEditorRef && setTextEditorRef(ref);
          }}
        />
      </div>
    </Paper>
  );
};

export default Callout;
