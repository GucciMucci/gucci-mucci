import React, { Component } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";

class Header extends Component {
  componentDidMount() {
    this.props.context.authListenier();
  }

  render() {
    return (
      <div className="header">
        <Link to="/">
          <span>GUCCI</span>
        </Link>
        {this.props.context.user === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={this.props.context.logout}>Logout</button>
        )}
        <Link to="/bag">
          <span className="bag-link">👜</span>
        </Link>
        <nav>
          <Link to="/women/dresses">Women</Link>
        </nav>
      </div>
    );
  }
}

export default withContext(Header);
