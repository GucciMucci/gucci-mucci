import React, { Component } from "react";
import firebase from "../components/firebase";
import { withRouter } from "react-router-dom";

export const AppContext = React.createContext();

class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  authListenier = () => {
    firebase.auth().onAuthStateChanged(user => {
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

  logout = () => {
    firebase.auth().signOut();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          authListenier: this.authListenier,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter(ContextProvider);
