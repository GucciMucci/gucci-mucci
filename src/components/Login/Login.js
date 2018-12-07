import React, { Component } from "react";
import firebase from "./../firebase";
import "./Login.scss";
import diamond from "../../diamond.svg";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  login = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const usersRef = firebase.database().ref(`users/${user.user.uid}/cart`);
        console.log(user);
        // console.log(JSON.parse(localStorage.getItem("bagArray")));
        usersRef.once("value").then(res => {
          console.log("once res~~~~", res.val());
          if (localStorage.getItem("bagArray")) {
            if (res.val()) {
              usersRef.set([...res.val(), ...JSON.parse(localStorage.getItem("bagArray"))]);
              localStorage.clear();
            } else {
              usersRef.set([...JSON.parse(localStorage.getItem("bagArray"))]);
              localStorage.clear();
            }
          }
          this.props.history.push("/profile");
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  signup = e => {
    e.preventDefault();
    const usersRef = firebase.database().ref("users");
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        usersRef.child(user.user.uid).set({ email: user.user.email, cart: [{ price: 0 }] });
        this.props.history.push("/profile");
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ error: error.message });
      });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="login">
        <h1 className="signin-title">Sign In</h1>
        <img src={diamond} className="diamond" />
        <div className="content">
          <form className="login-form">
            <div className="signin-input">
              <label>EMAIL ADDRESS</label>
              <input
                value={this.state.email}
                name="email"
                type="email"
                onChange={this.handleChange}
                placeholder="Enter email"
                className="form-input"
              />
              <label>PASSWORD (case sensitive)</label>
              <input
                value={this.state.password}
                name="password"
                type="password"
                onChange={this.handleChange}
                placeholder="Enter password"
                className="form-input"
              />

              {this.state.error && <div className="error-msg">Please enter a valid password. {this.state.error}</div>}

              <button type="submit" onClick={this.login} className="signin-btn">
                SIGN IN
              </button>
            </div>
          </form>

          <div className="new-account-signin">
            <h2>DON'T HAVE AN ACCOUNT? </h2>
            <h3>Having a Gucci account will give you access to: </h3>
            <ul>
              <li>Saved items in your wishlist.</li>
              <li>Personalized recommendations. </li>
              <li>Order delivery updates and return management.</li>
            </ul>
            <button onClick={this.signup} className="signup-btn">
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
