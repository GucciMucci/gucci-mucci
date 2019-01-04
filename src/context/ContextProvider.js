import React, { Component } from "react";
import firebase from "../components/firebase";
import { withRouter } from "react-router-dom";

export const AppContext = React.createContext();

class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      favorites: null,
      showMemo: false,
      showAdd: false,
      search: false
    };
    this.toggleSearch = this.toggleSearch.bind(this);
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
      const favRef = firebase
        .database()
        .ref(`users/${this.state.user.id}/favorites`);
      favRef.once("value").then(res => {
        console.log("res value", res.val());
        if (res.val() !== null) {
          favRef.set([...res.val(), product]);
        } else {
          usersRef.child("favorites").set([product]);
        }
      });
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

  showAddMemo = () => {
    this.setState({ showAdd: true });
    setTimeout(() => {
      this.setState({ showAdd: false });
    }, 1600);
  };

  showMemo = () => {
    this.setState({ showMemo: true });
    setTimeout(() => {
      this.setState({ showMemo: false });
    }, 3600);
  };

  addToBag = product => {
    product.quantity = 1;
    if (this.state.user) {
      const usersRef = firebase
        .database()
        .ref(`users/${this.state.user.id}/cart`);
      usersRef.once("value").then(res => {
        let cart = res.val();
        let index = cart
          ? cart.findIndex(item => item.style === product.style)
          : -1;
        if (index !== -1) {
          if (cart[index].quantity < 5) {
            cart[index].quantity += 1;
            usersRef.set(cart);
            this.showAddMemo();
          } else this.showMemo();
        } else if (cart) {
          usersRef.set([...cart, product]);
          this.showAddMemo();
        } else {
          usersRef.set([product]);
          this.showAddMemo();
        }
      });
    } else {
      let localBag = localStorage.getItem("bagArray");
      if (localBag) {
        const tempBag = JSON.parse(localStorage.getItem("bagArray"));
        const index = tempBag.findIndex(item => item.style === product.style);
        if (index !== -1) {
          if (tempBag[index].quantity < 5) {
            tempBag[index].quantity += 1;
            this.showAddMemo();
          } else this.showMemo();
        } else {
          tempBag.push(product);
          this.showAddMemo();
        }
        localStorage.setItem("bagArray", JSON.stringify(tempBag));
      } else {
        localStorage.setItem("bagArray", JSON.stringify([product]));
        this.showAddMemo();
      }
      return localStorage;
    }
  };

  toggleSearch() {
    this.setState({ search: !this.state.search });
  }

  render() {
    console.log("context user", this.state.user);
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          authListenier: this.authListenier,
          logout: this.logout,
          addFav: this.addFav,
          addToBag: this.addToBag,
          toggleSearch: this.toggleSearch
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter(ContextProvider);
