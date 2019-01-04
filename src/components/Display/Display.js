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
      data: this.props.results || [],
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
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.search) {
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
    } else if (prevProps !== this.props) {
      this.setState({ data: this.props.results });
    }
  }

  render() {
    return (
      <div className="products">
        {this.state.data
          ? this.state.data.map(item => {
              return <Card key={item.style} item={item} />;
            })
          : "Loading..."}
      </div>
    );
  }
}
