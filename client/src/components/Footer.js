import React from "react";
import Logo from "../img/customlogo.png";

export default function Footer() {
  return (
    <footer className="d-flex justify-content-between p-3">
      <a href="#" className="navbar-brand">
        <img src={Logo} alt="logo" />
      </a>
      <span style={{ lineHeight: "2.7rem" }}>
        Made with ♥️ and <b>React.js</b>.
      </span>
    </footer>
  );
}
