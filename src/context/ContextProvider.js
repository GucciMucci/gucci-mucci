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
    let localFav = localStorage.getItem("favorites");
    if (this.state.user) {
      const usersRef = firebase.database().ref(`users/${this.state.user.id}`);
      const favRef = firebase.database().ref(`users/${this.state.user.id}/favorites`);
      // if (favRef) {
      //   favRef.once("value").then(res => {
      //     let favs = res.val();
      //     console.log(favs);
      //     favRef.set([...favs, product]);
      //   });
      // } else {
      usersRef.child("favorites").set([product]);
      // }
    } else {
      if (localFav) {
        const tempFav = JSON.parse(localStorage.getItem("favorites"));
        tempFav.push(product);
        localStorage.setItem("favorites", JSON.stringify(tempFav));
      } else {
        localStorage.setItem("favorites", JSON.stringify([product]));
      }
      console.log("localfavs", localStorage.getItem("favorites"));
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
