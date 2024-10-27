import React from "react";

// isFixed -> true
// 화면을 다 채우고 싶다면

// isFixed -> false
// relative 안에 특정 부분만 채우고 싶다면
function Loading({ isFixed }) {
  const styles = { position: isFixed ? "fixed" : "absolute" };
  return (
    <>
      <div className="loading-bar" style={styles}>
        <div className="loading-bar__line"></div>
        <div className="loading-bar__line"></div>
        <div className="loading-bar__line"></div>
      </div>
      <div className="loading-bg" style={styles}></div>
    </>
  );
}

export default Loading;
