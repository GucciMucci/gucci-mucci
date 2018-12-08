import React, { Component } from "react";
import "./display.scss";
import Card from "../Card/Card";
import firebase from "../firebase";

export default class Display extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      currentItem: "",
      data: [],
      route: window.location.pathname
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref(this.state.route)
      .once("value")
      .then(snapshot => {
        this.setState({
          data: snapshot.val()
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.state.route !== window.location.pathname) {
      firebase
        .database()
        .ref(window.location.pathname)
        .once("value")
        .then(snapshot => {
          this.setState({
            route: window.location.pathname,
            data: snapshot.val()
          });
        });
    }
  }

  render() {
    return (
      <div className="products">
        {this.state.data.map(item => (
          <Card key={item.style} item={item} />
        ))}
      </div>
    );
  }
}
