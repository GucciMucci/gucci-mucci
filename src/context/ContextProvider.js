import React, { Component } from "react";
import firebase from "../components/firebase";

export const AppContext = React.createContext();

export default class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  authListenier = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log("---user id", user);
      if (user) {
        this.setState({
          user: {
            id: user.uid,
            email: user.email
          }
        });
      } else {
        this.setState({ user: null });
      }
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{ ...this.state, authListenier: this.authListenier }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
