import React, { Component } from "react";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";
import "./SavedItems.scss";
import { Link } from "react-router-dom";

class SavedItems extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }
  getFavs() {
    if (this.props.context.user) {
      const usersRef = firebase.database().ref(`users/${this.props.context.user.id}/favorites`);
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
  removeFav(style) {
    if (this.props.context.user) {
      const favRef = firebase.database().ref(`users/${this.props.context.user.id}/favorites`);
      favRef.once("value").then(res => {
        let favs = res.val();
        let index = favs.findIndex(item => item.style === style);
        if (index !== -1) {
          favs.splice(index, 1);
        }
        favRef.set(favs);
        this.setState({ favorites: favs });
      });
    } else {
      const tempFav = JSON.parse(localStorage.getItem("favorites"));
      let favIndex = tempFav.findIndex(item => item.style === style);
      tempFav.splice(favIndex, 1);
      localStorage.setItem("favorites", JSON.stringify(tempFav));
      this.setState({ favorites: tempFav });
    }
  }
  render() {
    console.log(this.state.favorites);
    return (
      <div className="saved-items">
        <h1 className="saved-title">SAVED ITEMS</h1>
        {this.state.favorites && <p>You Have {this.state.favorites.length} Items In Your Saved Items</p>}
        <div className="card-holder">
          {this.state.favorites &&
            this.state.favorites.map(item => {
              console.log(item);
              return (
                <div key={item.style} className="saved-card">
                  <span onClick={() => this.removeFav(item.style)}>&times;</span>
                  <img src={item.images[0].image} height={430} />
                  <h1>{item.name}</h1>
                  <p>{item.price}</p>
                  <div className="add-bag" onClick={() => this.props.context.addToBag(item)}>
                    ADD TO BAG
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default withContext(SavedItems);
