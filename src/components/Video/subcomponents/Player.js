import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import ReactPlayerLoader from "@brightcove/react-player-loader";
import { VideoContext } from "../VideoContext";

const PlayerContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
  paddingTop: "30px",
  "& .video-js": {
    width: "760px",
    height: "427.5px",
  },
});

const Player = ({ videoId = null, setVideoData, videoData }) => {
  const [state, dispatch] = useContext(VideoContext);

  const BRIGHTCOVE_API = "https://edge.api.brightcove.com/playback/v1/accounts";
  const BRIGHTCOVE_ACCOUNT_ID = process.env.BRIGHTCOVE_ACCOUNT_ID;

  const headers = {
    "BCOV-Policy": process.env.BRIGHTCOVE_POLICY_KEY,
  };
  useEffect(() => {
    if (videoId !== null) {
      dispatch({
        func: "UPDATE_URL_DATA",
        data: `${BRIGHTCOVE_API}/${BRIGHTCOVE_ACCOUNT_ID}/videos/${videoId}`,
        videoId: videoId,
      });
      loadVideo();
    }
  }, [videoId]);

  const loadVideo = async () => {
    const result = await fetch(state.videoURL, { headers });
    setVideoData(await result.json());
  };

  const updateBody = () => {
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
      description: body,
    });
    dispatch({
      func: "CHANGE_CREDITS",
      credit: videoData?.tags[0],
    });
  };

  return (
    <PlayerContainer>
      {videoId == null && (
        <ReactPlayerLoader
          videoId={""}
          BRIGHTCOVE_API={BRIGHTCOVE_API}
          BRIGHTCOVE_ACCOUNT_ID={BRIGHTCOVE_ACCOUNT_ID}
          accountId={BRIGHTCOVE_ACCOUNT_ID}
        />
      )}
      {videoId !== null && (
        <ReactPlayerLoader
          videoId={state.videoId}
          BRIGHTCOVE_API={BRIGHTCOVE_API}
          BRIGHTCOVE_ACCOUNT_ID={BRIGHTCOVE_ACCOUNT_ID}
          accountId={BRIGHTCOVE_ACCOUNT_ID}
        />
      )}
    </PlayerContainer>
  );
};

export default Player;