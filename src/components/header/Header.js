import React, { Component } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";
import logo_white from "./logo_white.png";
import logo_black from "./logo_black.png";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }
  componentDidMount() {
    this.props.context.authListenier();
  }

  getOptions = () => {
    let pathname = window.location.pathname;
    let name = pathname.split("/");
    switch (pathname) {
      case "/":
        console.log("root");
        break;
      case "/women/dresses":
      case "/women/coats":
      case "/login":
      case "/checkout":
        return "black";
      case "/women/dresses/" + name[name.length - 1]:
      case "/women/coats/" + name[name.length - 1]:
        return "gray";
    }
    return "";
  };

  render() {
    let options = this.getOptions();
    return (
      <div
        className={"header " + options}
        onMouseEnter={() => {
          if (options === "gray") {
            this.setState({ hover: true });
          }
        }}
        onMouseLeave={() => {
          if (options === "gray") {
            this.setState({ hover: false });
          }
        }}
      >
        <div className="top">
          <div className="top-child left">
            <p>United Stated</p>
            <p>English</p>
            <p>+1.877.482.2430</p>
          </div>
          <Link to="/" className="top-child">
            <img className="logo" src={this.state.hover ? logo_white : logo_black} alt="" />
          </Link>
          <div className="top-child right">
            {this.props.context.user === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <div>
                <Link to="/saved-items">Saved</Link>
                <Link to="/profile">Profile</Link>
                <a href="#" onClick={this.props.context.logout}>
                  Logout
                </a>
              </div>
            )}
            <Link to="/bag">
              <span className="bag-link">👜</span>
            </Link>
          </div>
        </div>
        <nav>
          <Link to="/women/dresses">Women</Link>
          <Link to="/women/coats">Men</Link>
          <Link to="/women/dresses">Children</Link>
          <Link to="/women/dresses">Jewelry & watches</Link>
        </nav>
      </div>
    );
  }
}

export default withContext(Header);
