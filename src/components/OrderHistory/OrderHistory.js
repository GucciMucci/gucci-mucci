import React, { Component } from "react";
import withContext from "../../context/Context_HOC";
import "../Profile/Profile.scss";
import { Link } from "react-router-dom";
import firebase from "firebase";
import _ from "../utils";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  getOrders() {
    if (this.props.context.user) {
      let uid = this.props.context.user.id;
      firebase
        .database()
        .ref(`users/${uid}/orders`)
        .once("value")
        .then(orders => {
          orders.val() && this.setState({ orders: orders.val() });
        });
    }
  }

  componentDidMount() {
    this.getOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.context !== prevProps.context) {
      this.getOrders();
    }
  }

  render() {
    return (
      <div className="profile">
        <div className="profile-header">
          <h1>ORDER HISTORY</h1>
        </div>
        <div className="profile-container">
          {this.state.orders.map((order, index) => {
            let total = _.getTotal(order);
            return (
              <div>
                <h1>Order {index + 1}</h1>
                {order.map(product => {
                  return <div>{product.name}</div>;
                })}
                <h3>Total: {total}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withContext(Profile);
