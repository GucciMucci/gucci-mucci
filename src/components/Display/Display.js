import React, { Component } from "react";
import "./display.scss";
import Card from "../Card/Card";
import firebase from "../firebase";

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      currentItem: "",
      data: [],
      route: window.location.pathname,
      search: this.props.search || false
    };
  }

  componentDidMount() {
    if (!this.state.search) {
      firebase
        .database()
        .ref(this.state.route)
        .once("value")
        .then(snapshot => {
          this.setState({
            data: snapshot.val()
          });
        });
    } else {
    }
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
        {this.state.data.map(item => {
          return <Card key={item.style} item={item} />;
        })}
      </div>
    );
  }
}
