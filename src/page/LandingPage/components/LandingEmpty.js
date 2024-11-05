import React from "react";

function LandingEmpty({ name }) {
  return (
    <div className="landing-empty">
      {!name ? (
        <h2>There are no products on this page</h2>
      ) : (
        <h2>There are no products matching {name}</h2>
      )}
    </div>
  );
}

export default LandingEmpty;
