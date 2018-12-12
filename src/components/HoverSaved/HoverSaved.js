import React, { Component } from "react";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";
import "./hoverSaved.scss";
import { Link } from "react-router-dom";
import _ from "../utils";

class HoverSaved extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }
  getFavs() {
    if (this.props.context.user) {
      const usersRef = firebase
        .database()
        .ref(`users/${this.props.context.user.id}/favorites`);
      usersRef.once("value").then(res => {
        console.log(res.val());
        this.setState({
          favorites: res.val()
        });
      });
    } else {
      const tempFav = JSON.parse(localStorage.getItem("favorites"));
      console.log(tempFav);
      this.setState({
        favorites: tempFav
      });
    }
  }
  componentDidMount() {
    this.getFavs();
  }
  componentDidUpdate(prevProps) {
    if (this.props.context !== prevProps.context) {
      this.getFavs();
    }
  }
  render() {
    return (
      <div className="saved-hover">
        <h1 className="hover-bag-title">Saved Items</h1>
        <div className="hover-items">
          {this.state.favorites &&
            this.state.favorites.map(item => {
              console.log(item);
              return (
                <div key={item.style} className="saved-hover-card">
                  <img
                    className="bag-product-img-2 white"
                    src={_.white(item.images[1].image)}
                    alt=""
                  />
                  <img
                    className="bag-product-img-2 red"
                    src={_.lightBrownGray(item.images[1].image)}
                    alt=""
                  />
                  <div className="saved-hover-right">
                    <h1>{item.name}</h1>
                    <p>Added 12/07/18</p>
                  </div>
                </div>
              );
            })}
        </div>
        <button className="view-saved">VIEW MY SAVED ITEMS</button>
      </div>
    );
  }
}

export default withContext(HoverSaved);
