import React from "react";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <section className="navigation">
      <div
        className="navigation__brand"
        onClick={() => window.location.assign("/")}
      >
        Reddit Streaming
      </div>
    </section>
  );
};

export default Navigation;
