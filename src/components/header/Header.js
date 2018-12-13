import React, { Component } from "react";
import { Link } from "react-router-dom";
import withContext from "../../context/Context_HOC";
import Hover from "../Hover/Hover";
import HoverBag from "../HoverBag/HoverBag";
import Nav from "../Nav/Nav";
import firebase from "firebase";

import logo_white from "./logo_white.png";
import heart from "../Card/heart-regular.svg";
import bag from "./bag.svg";
import search from "./search.svg";

import "./header.scss";

class Header extends Component {
  componentDidMount() {
    this.props.context.authListenier();
    window.addEventListener("scroll", this.resizeHeaderOnScroll);
  }

  // addCat = () => {
  //   let dataRef = firebase.database().ref("women/coats");
  //   dataRef.once("value").then(snapshot => {
  //     let data = snapshot.val();
  //     data = data.map(item => {
  //       item.cat = "women";
  //       item.subCat = "coats";
  //       return item;
  //     });
  //     dataRef.set(data);
  //   });
  // };

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
      default:
        return "";
    }
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
            <p>United States</p>
            <p>English</p>
            <p>+1.877.482.2430</p>
          </div>
          <Nav />
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
        {/* <button onClick={this.addCat}>Click once</button> */}
      </div>
    );
  }
}

export default withContext(Header);
