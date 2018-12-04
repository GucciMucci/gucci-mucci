import React, { Component } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "./../firebase";
import Login from "../Login/Login";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.authListenier();
  }
  authListenier() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      console.log("---user id", user.uid);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  logout = () => firebase.auth().signOut();

  render() {
    return (
      <div className="header">
        <Link to="/">
          <span>GUCCI</span>
        </Link>
        {this.state.user ? <button onClick={this.logout}>Logout</button> : <Link to="/login">Login</Link>}
        <Link to="/bag">
          <span className="bag-link">👜</span>
        </Link>
      </div>
    );
  }
}
