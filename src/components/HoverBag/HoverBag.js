import React, { Component } from "react";
import firebase from "firebase";
import withContext from "../../context/Context_HOC";
import _ from "../utils";
import "./hoverBag.scss";
import { Link } from "react-router-dom";

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
    let total = _.getTotal(this.state.products);
    console.log("this.state.products---------->", this.state.products);
    const showProducts = this.state.products.map(product => {
      return (
        // <Link to={window.location.pathname + "/" + this.state.products.name}>
        <div key={product.style} className="hover-bag-item">
          <img
            className="bag-product-img-2 white"
            src={_.white(product.images[1].image)}
            alt=""
          />
          <img
            className="bag-product-img-2 red"
            src={_.lightBrownGray(product.images[1].image)}
            alt=""
          />
          <div className="product-details">
            <h2>{product.name}</h2>
            <h3>Style {product.style}</h3>
            <h3>Qty: {product.quantity} </h3>
            <h3>Price: {product.price}</h3>
            <h3>Size: Med </h3>
            <h2>AVAILABLE</h2>
          </div>
        </div>
        // </Link>
      );
    });
    return (
      <div className="hover-bag">
        <h1 className="hover-bag-title">Shopping Bag</h1>
        <div className="show-products">{showProducts}</div>
        {this.state.products ? (
          <div>
            <div className="total">
              <span>Sub Total</span>
              <span className="money">$ {total}</span>
            </div>
            <div className="bag-bottom">
              <Link to="/checkout" className="btn-link">
                <button className="checkout-btn">CHECKOUT</button>
              </Link>
              <Link to="/bag" className="btn-link">
                <button className="cart-details-btn">VIEW CART DETAILS</button>
              </Link>
              <button className="pay-pal-btn">PAY WITH ©PayPal</button>
            </div>
          </div>
        ) : (
          <div className="empty-bag-fav">Currently Empty</div>
        )}
      </div>
    );
  }
}
export default withContext(HoverBag);
