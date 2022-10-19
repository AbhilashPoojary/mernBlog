import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/customlogo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg p-3">
      <div className="container-fluid p-0">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" />
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Categories
              </a>
              <div className="dropdown-menu">
                <Link to="/?cat=art" className="dropdown-item">
                  Art
                </Link>
                <Link to="/?cat=science" className="dropdown-item">
                  Science
                </Link>
                <Link to="/?cat=technology" className="dropdown-item">
                  Technology
                </Link>
                <Link to="/?cat=cinema" className="dropdown-item">
                  Cinema
                </Link>
                <Link to="/?cat=design" className="dropdown-item">
                  Design
                </Link>
                <Link to="/?cat=food" className="dropdown-item">
                  Food
                </Link>
              </div>
            </div>
            <Link to="/create" className="nav-item nav-link" tabIndex={-1}>
              Create
            </Link>
            <Link to="/profile" className="nav-item nav-link" tabIndex={-1}>
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
