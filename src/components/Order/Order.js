import React, { Component } from "react";
import "./Order.scss";

export default class extends Component {
  render() {
    const orderSummary =
      this.props.location.state &&
      this.props.location.state.map(item => {
        return (
          <div className="producto">
            <img src={item.images[0].image} width={200} />
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
        );
      });
    return (
      <div className="order-confirm">
        <div className="summary-head">
          <h1>Your Order Has Been Recieved!</h1>
        </div>

        <div className="confirm-body">
          <p>Thank you for shopping with us at Gucci.com</p>
          <p>We are pleased to inform you that your order has been recieved and is being processed.</p>
          <p>Below is a summary of your order</p>
          <p>Your preferred shipping method: Free(Next Day)</p>
          <p>
            All items are subject to availability and credit card verification. If we are unable to fulfill your order, we will be sure to
            inform you. You will recieve a shipping confirmation once your order has shipped. Your credit card will only be charged at the
            time of shipment. Gucci online purchases will require an adult signature upon delivery.
          </p>
          <h3>Sincerely, Gucci</h3>
          <div className="display">
            <div className="sum-display">{orderSummary}</div>
          </div>
        </div>
      </div>
    );
  }
}
