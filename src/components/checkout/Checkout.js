import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import _ from "../utils";

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || []
    };
  }

  onToken = token => {
    console.log("onToken", token);
  };
  render() {
    let total = _.getTotal(this.state.products);
    const showProducts = this.state.products.map(product => {
      return (
        <div>
          <span>{product.name}</span>
          <span>{product.price}</span>
        </div>
      );
    });
    return (
      <div>
        <h1>CHECKOUT</h1>
        {showProducts}
        <h1>TOTAL: {total}</h1>
        <StripeCheckout
          name="Gucci"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/2000px-1960s_Gucci_Logo.svg.png"
          amount={total * 100}
          token={this.onToken}
          stripeKey="pk_test_FA9iXNKE4bHwWBQ0KlKbKOq2"
        />
      </div>
    );
  }
}
