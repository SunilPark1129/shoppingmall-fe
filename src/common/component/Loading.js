import React from "react";

function Loading({ clickable }) {
  return (
    <>
      <div className="loading-bar">
        <div className="loading-bar__line"></div>
        <div className="loading-bar__line"></div>
        <div className="loading-bar__line"></div>
      </div>
      {!clickable && <div className="loading-bg"></div>}
    </>
  );
}

export default Loading;
