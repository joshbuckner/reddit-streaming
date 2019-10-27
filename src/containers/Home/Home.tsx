import React from "react";
import "./Home.scss";
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <section className="content">
        <div className="instructions">
          <div className="text-container">
            <div className="instructions__text">
              <span className="highlight">(1)</span> Replace{" "}
              <span className="highlight">www.reddit.com</span> with{" "}
              <span className="highlight">www.reddit-streaming.com</span> in any
              comment thread
            </div>
            <div className="instructions__text">
              <span className="highlight">(2)</span> View a live stream of
              incoming comments
            </div>
          </div>
          <div
            className="instructions__button"
            onClick={() =>
              window.location.assign(
                "/r/leagueoflegends/comments/dk6zta/fnatic_vs_royal_never_give_up_2019_world/"
              )
            }
          >
            Try It Out
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
