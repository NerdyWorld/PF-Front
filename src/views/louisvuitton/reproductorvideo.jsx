import React from "react";

function VideoPlayer(props) {
  return (
    <div className="video-player">
      <video autoplay loop playsinline muted controls>
        <source src={props.videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;
