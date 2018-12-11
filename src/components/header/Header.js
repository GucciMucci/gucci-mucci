import React, { Component } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";
import Hover from "../Hover/Hover";
import HoverBag from "../HoverBag/HoverBag";

class Header extends Component {
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
      case "/women/dresses/" + name[name.length - 1]:
      case "/login":
      case "/checkout":
        return "black";
    }
    return "";
  };

  render() {
    let options = this.getOptions();
    return (
      <div className={"header " + options}>
        <div className="top">
          <div className="top-child left">
            <p>United Stated</p>
            <p>English</p>
            <p>+1.877.482.2430</p>
          </div>
          <Link to="/" className="top-child">
            <span className="logo">GUCCI</span>
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
              <span className="bag-link">
                <Hover content={HoverBag} button="👜" />
              </span>
            </Link>
            <span>🔍</span>
          </div>
        </div>
        <nav>
          <Link to="/women/dresses">Women</Link>
          <Link to="/women/dresses">Men</Link>
          <Link to="/women/dresses">Children</Link>
          <Link to="/women/dresses">Jewelry & watches</Link>
        </nav>
      </div>
    );
  }
}

export default withContext(Header);
