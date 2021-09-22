import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Keyboard } from "../assets/keyboard.svg";
import { ReactComponent as Wave } from "../assets/wave.svg";
import { ReactComponent as Search } from "../assets/undraw_search.svg";
import { ReactComponent as CleanScreen } from "../assets/clean_screen.svg";
import { ReactComponent as Fast } from "../assets/fast_loading.svg";

import "../css/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <section className="first-page" id="home">
        <div className="mid-container">
          <div className="main-content">
            <h1>
              Welcome to <span style={{ fontWeight: "bold" }}>Keytonomy</span>
            </h1>
            <h3>A clean minimalistic view of Geekhack posts</h3>
            <a href="#about">
              <button className="cta-button">Learn More</button>
            </a>
          </div>
          <Keyboard className="keyboard" />
        </div>
        <Wave className="waves" />
      </section>
      <section className="second-page" id="about">
        <Wave className="waves" />
        <div className="cards-container">
          <div className="card">
            <Search className="card-illustration" />
            <h4 className="card-title">What is Keytonomy?</h4>
            <p className="card-text">
              Keytonomy is the go to place when viewing interest checks and
              group buys. Featuring an autonomous and self-updating too, you’ll
              never have to worry as Keyboardio is constantly up to date.
            </p>
          </div>
          <div className="card">
            <CleanScreen className="card-illustration" />
            <h4 className="card-title">Why Should I Use Keytonomy?</h4>
            <p className="card-text">
              Let’s be honest, Geekhack is not a pretty website. It has an
              outdated look of a 2009 forum site that went more for
              functionality than visuals. Let’s make the push towards a cleaner
              and more sophisticated view for the kyeboard community
            </p>
          </div>
          <div className="card">
            <Fast className="card-illustration" />
            <h4 className="card-title">How Does it Work?</h4>
            <p className="card-text">
              Simply put, Keytonomy features a fast web scrapping backend that
              is constantly scowering Geekhack grabbing any necessary data. In
              return, you get a clean minimalistic view of Geekhack posts
            </p>
          </div>
        </div>
        <div className="cta-last">
          <p>What are you waiting for?</p>
          <Link to="/posts/latest/all?page=1&limit=25">
            <button className="cta-button">Start Browsing</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
