import React from "react";

function VideoPlayer({ videoUrl, poster }) {
  return (
    <video
      key={videoUrl}
      width={1000}
      height={250}
      controls
      className="rounded-sm"
      poster={poster}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
