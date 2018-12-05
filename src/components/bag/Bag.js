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
        <div>
          <h1>{product.name}</h1>
          <h3>Price: {product.price}</h3>
          <img src={product.images[0].image} alt="" />
          <button onClick={() => this.removeFromBag(product.style)}>
            Remove from 👜
          </button>
        </div>
      );
    });
    return (
      this.state.products && (
        <div>
          <div>{showProducts}</div>
          <div>Total: {total} </div>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      )
    );
  }
}
