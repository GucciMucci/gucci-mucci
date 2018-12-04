import React, { Component } from "react";
import firebase from "./../firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  login = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  signup = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form>
          <div>
            <label>Enter email address:</label>
            <input value={this.state.email} name="email" type="email" onChange={this.handleChange} placeholder="Enter email" />
            <label>Enter password:</label>
            <input value={this.state.password} name="password" type="password" onChange={this.handleChange} placeholder="Enter password" />
          </div>

          <button type="submit" onClick={this.login}>
            Login
          </button>
          <button onClick={this.signup}>Sign Up</button>
        </form>
      </div>
    );
  }
}
