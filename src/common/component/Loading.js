import React from "react";

function Loading() {
  return (
    <>
      <div className="loading-bar">
        <div className="loading-bar__line"></div>
        <div className="loading-bar__line"></div>
        <div className="loading-bar__line"></div>
      </div>
      <div className="loading-bg"></div>
    </>
  );
}

export default Loading;
