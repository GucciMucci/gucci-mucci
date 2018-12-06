import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import _ from "../utils";
import { Link } from "react-router-dom";
import withContext from "../../context/Context_HOC";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || [],
      total: 0
    };
  }

  componentDidMount() {
    this.props.context.authListenier();
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
    this.props.context.user &&
      console.log("user.email---------->", this.props.context.user.email);
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
        <div>{showProducts}</div>
        <h1>TOTAL: {total}</h1>
        <StripeCheckout
          name="© G U C C I"
          image="http://desiderata.info/wp-content/uploads/Gucci-GG-logo.png"
          // White logo with black background:
          // image="http://www.noradot.com/wp-content/uploads/2016/10/gucci-desktop-6.jpg"
          amount={total * 100}
          token={this.onToken}
          email={
            this.props.context.user ? this.props.context.user.email : undefined
          }
          stripeKey="pk_test_FA9iXNKE4bHwWBQ0KlKbKOq2"
        />

        <span>
          <Link to="/bag">
            <button>Back to Bag</button>
          </Link>
        </span>
      </div>
    );
  }
}

export default withContext(Checkout);
