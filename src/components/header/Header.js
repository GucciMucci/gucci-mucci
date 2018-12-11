import React, { Component } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";
import logo_white from "./logo_white.png";
import logo_black from "./logo_black.png";
import Hover from "../Hover/Hover";
import HoverBag from "../HoverBag/HoverBag";
import heart from "../Card/heart-regular.svg";
import bag from "./bag.svg";
import search from "./search.svg";

class Header extends Component {
  componentDidMount() {
    this.props.context.authListenier();
    window.addEventListener("scroll", this.resizeHeaderOnScroll);
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

  resizeHeaderOnScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 100,
      header = document.getElementById("header");

    if (distanceY > shrinkOn) {
      if (this.getOptions() === "gray") {
        header.classList.add("blacker");
      } else {
        header.classList.add("smaller");
      }
    } else {
      if (this.getOptions() === "gray") {
        header.classList.remove("blacker");
      } else {
        header.classList.remove("smaller");
      }
    }
  };

  render() {
    return (
      <div id="header" className={"header " + this.getOptions()}>
        <div className="top">
          <div className="left">
            <p>United Stated</p>
            <p>English</p>
            <p>+1.877.482.2430</p>
          </div>
          <nav className="middle">
            <Link to="/women/dresses">Women</Link>
            <Link to="/women/coats">Men</Link>
            <Link to="/women/dresses">Children</Link>
            <Link to="/women/dresses">Jewelry & watches</Link>
          </nav>
          <div className="right">
            {this.props.context.user === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <div className="account">
                <Link to="/profile">My Account</Link>
                <a href="#" onClick={this.props.context.logout}>
                  Logout
                </a>
              </div>
            )}
            <Link to="/saved-items">
              <img className="heart" src={heart} alt="" />
            </Link>
            <Link to="/bag">
              <span className="bag-link">
                <Hover content={HoverBag}>
                  <img src={bag} alt="" />
                </Hover>
              </span>
            </Link>
            <span className="search">
              <img src={search} alt="" />
            </span>
          </div>
        </div>
        <Link to="/" className="logo">
          <img src={logo_white} alt="" />
        </Link>
      </div>
    );
  }
}

export default withContext(Header);
