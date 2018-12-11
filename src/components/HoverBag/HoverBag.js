import React, { Component } from "react";
import firebase from "firebase";
import withContext from "../../context/Context_HOC";
import _ from "../utils";
import "./hoverBag.scss";

class HoverBag extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || []
    };
  }

  getBag() {
    if (this.props.context.user) {
      let uid = this.props.context.user.id;
      firebase
        .database()
        .ref(`users/${uid}/cart`)
        .once("value")
        .then(cart => {
          cart.val() && this.setState({ products: cart.val() });
        });
    }
  }

  componentDidMount() {
    this.getBag();
  }

  componentDidUpdate(prevProps) {
    if (this.props.context !== prevProps.context) {
      this.getBag();
    }
  }
  render() {
    const showProducts = this.state.products.map(product => {
      return (
        <div key={product.style} className="hover-bag-item">
          <img
            className="bag-product-img"
            src={product.images[0].image}
            alt=""
          />
          <div className="product-details">
            <h1>{product.name}</h1>
            <h3>Style {product.style}</h3>
            <h3>Qty: {product.quantity} </h3>
            <h3>Price: {product.price}</h3>
            <h3>Size: Med </h3>
            <h3>AVAILABLE</h3>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1 className="hover-bag-title">Shopping Bag</h1>
        {showProducts}
      </div>
    );
  }
}
export default withContext(HoverBag);
