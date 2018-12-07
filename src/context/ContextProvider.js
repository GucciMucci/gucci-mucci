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

  addFav = product => {
    if (this.state.user) {
      const usersRef = firebase.database().ref(`users/${this.state.user.id}`);
      const favRef = firebase.database().ref(`users/${this.state.user.id}/favorites`);
      if (favRef) {
        favRef.once("value").then(res => {
          let favs = res.val();
          favRef.set({ ...favs, [product.style]: product });
        });
      } else {
        usersRef.child("favorites").set({ [product.style]: product });
      }
    }
  };
  render() {
    console.log("context user", this.state.user);
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          authListenier: this.authListenier,
          logout: this.logout,
          addFav: this.addFav
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter(ContextProvider);
