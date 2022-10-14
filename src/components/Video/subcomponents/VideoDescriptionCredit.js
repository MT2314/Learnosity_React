import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import { VideoContext } from "../VideoContext";

import styled from "@emotion/styled";
import { TextareaAutosize } from "@material-ui/core";
import Text from "../../Text/Text";

const DescriptionInput = styled(TextareaAutosize)({
  width: "622px",
  border: "none",
  fontWeight: "400",
  letterSpacing: "0.4px",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  marginTop: "15px",
  lineHeight: "1.5rem",
  color: "#232323",
  minHeight: "72px",
  marginTop: "0.9375rem",
  background: "#FFF",
  resize: "none",

  "&::placeholder": {
    color: "#232323",
  },

  "&:focus": {
    outline: "none",

    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});

const CreditInpput = styled("input")({
  width: "622px",
  border: "none",
  height: "16px",
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "12px",
  fontStyle: "italic",
  "&::placeholder": {
    color: "#636363",
  },
});

const VideoDescriptionCredit = (props) => {
  const [state, dispatch] = useContext(VideoContext);
  const stateBody = useMemo(() => state?.body, [state?.body]);
  const [refs, setTextRef] = useState({ text: null, quill: null });
  const [textFocused, setTextFocused] = useState(false);

  const videoBodyRef = useRef();
  const placeholderRef = useRef();

  const updateBody = useCallback((body) => {
    dispatch({ func: "CHANGE_BODY", body: body.body });
  });

  useEffect(() => {
    if (!refs?.text?.contains(document.activeElement)) {
      setTextFocused(false);
    }
  }, [document.activeElement]);

  useEffect(() => {
    if (videoBodyRef.current) {
      props.setVideoBody(videoBodyRef.current);
      props.setPlaceHolder(placeholderRef.current);
    }
  }, []);

  const isValid = useMemo(
    () =>
      (!stateBody || !stateBody.ops || stateBody.ops[0].insert === "") &&
      !textFocused,
    [stateBody, textFocused, props.videoAreaFocused]
  );

  useEffect(() => {
    if (
      !props.videoAreaFocused &&
      (!stateBody || !stateBody.ops || stateBody.ops[0].insert === "")
    ) {
      setTextFocused(false);
    }
  }, [props.videoAreaFocused]);
  return (
    <div ref={videoBodyRef} style={{ position: "relative" }}>
      <Text
        body={stateBody}
        setProp={updateBody}
        setTextRef={setTextRef}
        sx={{ background: "#FFF" }}
        {...props}
      />
      <DescriptionInput
        ref={placeholderRef}
        onFocus={(e) => {
          e.preventDefault();
          refs.quill.focus();
          setTextFocused(true);
        }}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          display: isValid ? "block" : "none",
        }}
        name="infoBoxBody"
        aria-label={props.t("InfoBox body")}
        aria-multiline="true"
        placeholder="Description"
      />
      <CreditInpput type="text" placeholder="Credit" />
    </div>
  );
};

export default VideoDescriptionCredit;

{
  /* <Body
isVideo={isVideo}
videoHasFocus={videoHasFocus}
videoAreaFocused={videoAreaFocused}
setVideoHasFocus={setVideoHasFocus}
setVideoBody={setVideoBody}
setPlaceHolder={setPlaceHolder}
t={t} />*/
}
