import React, { Component } from "react";
import "./bag.scss";

export default class Bag extends Component {
  constructor() {
    super();
    this.state = {
      product: JSON.parse(localStorage.getItem("bagArray")) || []
    };
  }

  removeFromBag(style) {
    const tempBag = JSON.parse(localStorage.getItem("bagArray"));
    let itemIndex = tempBag.findIndex(item => item.style === style);
    tempBag.splice(itemIndex, 1);
    localStorage.setItem("bagArray", JSON.stringify(tempBag));
    this.setState({ product: tempBag });
  }

  render() {
    console.log("---bagArray------->", localStorage.getItem("bagArray"));
    console.log("this.state.product---------->", this.state.product);
    const showProducts = this.state.product.map(product => {
      return (
        <div>
          <h1>{product.name}</h1>
          <img src={product.images[0].image} alt="" />
          <button onClick={() => this.removeFromBag(product.style)}>
            Remove from 👜
          </button>
        </div>
      );
    });
    return this.state.product && <div>{showProducts}</div>;
  }
}
