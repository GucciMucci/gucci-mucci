import React, { Component } from "react";
import firebase from "./../firebase";
import withContext from "../../context/Context_HOC";

class SavedItems extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }
  componentDidMount() {
    const usersRef = firebase.database().ref(`users/${this.props.context.user.id}/favorites`);
    usersRef.once("value").then(res => {
      console.log(res.val());
      this.setState({
        favorites: res.val()
      });
    });
  }
  render() {
    return (
      <div>
        <h1>Saved Items!</h1>
        {this.state.favorites.map(item => {
          console.log(item);
          return (
            <div>
              <h1>{item.name}</h1>
              <img src={item.images[0].image} height={300} />
            </div>
          );
        })}
      </div>
    );
  }
}
export default withContext(SavedItems);
