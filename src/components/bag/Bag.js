import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "../utils";
import "./bag.scss";

export default class Bag extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || []
    };
  }

  removeFromBag(style) {
    const tempBag = JSON.parse(localStorage.getItem("bagArray"));
    let itemIndex = tempBag.findIndex(item => item.style === style);
    tempBag.splice(itemIndex, 1);
    localStorage.setItem("bagArray", JSON.stringify(tempBag));
    this.setState({ products: tempBag });
  }

  render() {
    console.log("---bagArray------->", localStorage.getItem("bagArray"));
    console.log("this.state.product---------->", this.state.products);
    let total = _.getTotal(this.state.products);

    console.log("total---------->", total);
    const showProducts = this.state.products.map(product => {
      return (
        <div key={product.style} className="bag-product">
          <h1>{product.name}</h1>
          <h3>Price: {product.price}</h3>
          <img
            className="bag-product-img"
            src={product.images[0].image}
            alt=""
          />
          <button onClick={() => this.removeFromBag(product.style)}>
            Remove
          </button>
        </div>
      );
    });
    return (
      this.state.products && (
        <div className="bag">
          <div className="bag-products">
            <h2 className="heading">YOUR SELECTIONS</h2>
            {showProducts}
          </div>

          <div className="order-sum">
            <h2 className="heading">ORDER SUMMARY</h2>
            <ul>
              <li>Subtotal $ {total}</li>
              <li>Shipping</li>
              <li>Estimated Tax</li>
              <li>Estimated Total $ {total}</li>
            </ul>
            <div>
              <h2>VIEW DETAILS</h2>
              <p>
                You will be charged only at the time of shipment except for DIY
                orders where the full amount is charged at the time of purchase.
              </p>
            </div>
            <div>
              <Link to="/checkout">
                <button className="checkout-btn">CHECKOUT</button>
              </Link>
              <div>OR</div>
              <button className="pay-pal-btn">PAY WITH ©PayPal</button>
            </div>
          </div>
        </div>
      )
    );
  }
}
