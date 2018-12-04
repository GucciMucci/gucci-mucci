import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

export default class Checkout extends Component {
  onToken = token => {
    console.log("onToken", token);
  };
  render() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_FA9iXNKE4bHwWBQ0KlKbKOq2"
        />
      </div>
    );
  }
}
