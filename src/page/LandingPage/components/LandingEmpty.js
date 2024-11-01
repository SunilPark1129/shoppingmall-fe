import React from "react";

function LandingEmpty({ name }) {
  return (
    <div className="landing-empty">
      {!name ? (
        <h2>해당 페이지에는 상품이 없습니다!</h2>
      ) : (
        <h2>{name} 과 일치한 상품이 없습니다!</h2>
      )}
    </div>
  );
}

export default LandingEmpty;
