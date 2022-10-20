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
  minHeight: "20px",
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

const CreditInput = styled("input")({
  width: "622px",
  border: "none",
  height: "16px",
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "12px",
  fontStyle: "italic",
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

const VideoDescriptionCredit = ({
  isVideo,
  videoHasFocus,
  videoAreaFocused,
  setVideoHasFocus,
  setVideoBody,
  setPlaceHolder,
  setVideoAPI,
  videoAPI,
  videoData,
  t,
}) => {
  const [state, dispatch] = useContext(VideoContext);
  const stateDescription = useMemo(
    () => state?.videoDescription,
    [state?.videoDescription]
  );
  const [refs, setTextRef] = useState({ text: null, quill: null });
  const [textFocused, setTextFocused] = useState(false);

  const videoBodyRef = useRef();
  const placeholderRef = useRef();

  const [videoTextSettings, setVideoTextSettings] = useState({
    description: null,
    credit: null,
  });

  // const stateDescription = {
  //   description: {
  //     ops: [
  //       {
  //         insert: videoData?.long_description
  //           ? videoData?.long_description.replace(/ /g, "\u00a0")
  //           : "",
  //       },
  //     ],
  //   },
  //   credit: {
  //     ops: [
  //       {
  //         insert: videoData?.tags,
  //       },
  //     ],
  //   },
  // };

  const updateBody = useCallback((body) => {
    dispatch({ func: "CHANGE_DESCRIPTION", body: body.body });
  });

  useEffect(() => {
    if (!refs?.text?.contains(document.activeElement)) {
      setTextFocused(false);
    }
  }, [document.activeElement]);

  useEffect(() => {
    if (videoBodyRef.current) {
      setVideoBody(videoBodyRef.current);
      setPlaceHolder(placeholderRef.current);
    }
  }, []);

  const isValid = useMemo(
    () =>
      (!stateDescription ||
        !stateDescription.ops ||
        stateDescription.ops[0].insert === "") &&
      !textFocused,
    [stateDescription, textFocused, videoAreaFocused]
  );

  useEffect(() => {
    if (
      !videoAreaFocused &&
      (!stateDescription ||
        !stateDescription.ops ||
        stateDescription.ops[0].insert === "")
    ) {
      setTextFocused(false);
    }
  }, [videoAreaFocused]);

  useEffect(() => {
    let body = {
      ops: [
        {
          insert: videoData?.long_description
            ? videoData?.long_description.replace(/ /g, "\u00a0")
            : "",
        },
      ],
    };

    dispatch({
      func: "CHANGE_DESCRIPTION",
      body: body,
    });
  }, [videoData?.long_description]);

  return (
    <div
      ref={videoBodyRef}
      style={{ position: "relative", minHeight: "20px", width: "622px" }}
    >
      <Text
        body={stateDescription}
        setProp={updateBody}
        setTextRef={setTextRef}
        setVideoAPI={setVideoAPI}
        videoAPI={videoAPI}
        videoTextSettings={videoTextSettings}
        setVideoTextSettings={setVideoTextSettings}
        isVideo={isVideo}
        videoHasFocus={videoHasFocus}
        videoAreaFocused={videoAreaFocused}
        setVideoHasFocus={setVideoHasFocus}
        setVideoBody={setVideoBody}
        setPlaceHolder={setPlaceHolder}
        videoData={videoData}
        t={t}
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
        aria-label={t("InfoBox body")}
        aria-multiline="true"
        placeholder="Video description"
        defaultValue={
          videoData?.long_description &&
          videoData?.long_description.replace(/ /g, "\u00a0")
        }
      />

      <CreditInput
        type="text"
        placeholder="Credit"
        defaultValue={videoData?.tags}
      />
    </div>
  );
};

export default VideoDescriptionCredit;
