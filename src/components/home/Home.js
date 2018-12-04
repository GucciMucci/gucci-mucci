import React, { Component } from "react";
import "./home.scss";
import Card from "../Card/Card";
import firebase from "../firebase";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      currentItem: "",
      data: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("women/dresses")
      .once("value")
      .then(snapshot => {
        this.setState({
          data: snapshot.val()
        });
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      username: ""
    });
  };

  render() {
    return (
      <div>
        <section className="add-item">
          {this.state.data.map(item => (
            <Card item={item} />
          ))}
        </section>
      </div>
    );
  }
}
