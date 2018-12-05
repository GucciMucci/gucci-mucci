import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import _ from "../utils";
import { Link } from "react-router-dom";

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || [],
      total: 0
    };
  }

  onToken = token => {
    let total = _.getTotal(this.state.products);
    axios.post("/api/stripe", {
      method: "POST",
      body: token,
      amount: total * 100
    });
    // .then(res => {
    //   res.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
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
        <Link to="/bag">
          <span>
            <button>Back to Bag</button>
          </span>
        </Link>
      </div>
    );
  }
}
