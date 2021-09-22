import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import { ReactComponent as Logo } from "../assets/keytonomy-logo.svg";
import { useOutsideToggle } from "../util/useOutsideToggle";

import "../css/Header.css";

function Header() {
  const wrapperRef = useRef(null);

  const toggleEffects = (body, nav, lines, content) => {
    nav.classList.toggle("nav-active");
    body.classList.toggle("no-scroll");
    Array.prototype.forEach.call(lines, (line) =>
      line.classList.toggle("toggle")
    );
    content.classList.toggle("blur");
  };

  const selectDOMItems = () => {
    const body = document.querySelector("body");
    const nav = document.querySelector(".main-nav");
    const lines = document.querySelectorAll("[class^='line']");
    const content = document.querySelector(".app");
    return { body, nav, lines, content };
  };

  // only toggleEffects if classList contains name of 'nav-active'
  const resetMenu = () => {
    const { body, nav, lines, content } = selectDOMItems();
    if (nav.classList.contains("nav-active")) {
      toggleEffects(body, nav, lines, content);
    }
  };

  useOutsideToggle(wrapperRef, resetMenu);

  const toggleMenu = () => {
    const { body, nav, lines, content } = selectDOMItems();
    toggleEffects(body, nav, lines, content);
  };

  const handleLinkClick = () => {
    // if menu nav is active => toggle effects
    if (document.querySelector(".main-nav").classList.contains("nav-active")) {
      toggleMenu();
    }
  };
  return (
    <header>
      <nav className="header-nav" ref={wrapperRef}>
        <div className="burger-nav" onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="logo-container">
          <Link to="/" className="logo-wrapper">
            <Logo className="logo" />
            <div className="logo-name">Keytonomy</div>
          </Link>
        </div>
        <ul className="main-nav">
          <li>
            <NavHashLink to="/#home" onClick={handleLinkClick}>
              Home
            </NavHashLink>
          </li>
          <li>
            <NavHashLink to="/#about" onClick={handleLinkClick}>
              About
            </NavHashLink>
          </li>
          <Link
            to="/posts/latest/all?page=1&limit=25"
            onClick={handleLinkClick}
          >
            <li>Browse Posts</li>
          </Link>
          <Link to="/faq" onClick={handleLinkClick}>
            <li>FAQ</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
