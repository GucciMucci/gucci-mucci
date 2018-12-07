import React, { Component } from "react";
import { Link } from "react-router-dom";
import withContext from "../../context/Context_HOC";
import firebase from "../firebase";
import _ from "../utils";
import "./bag.scss";

class Bag extends Component {
  constructor(props) {
    super(props);
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

  removeFromBag(style) {
    if (this.props.context.user) {
      const usersRef = firebase.database().ref(`users/${this.props.context.user.id}/cart`);
      usersRef.once("value").then(res => {
        let cart = res.val();
        let index = cart.findIndex(item => item.style === style);
        if (index !== -1) {
          cart.splice(index, 1);
        }
        usersRef.set(cart);
        this.setState({ products: cart });
      });
    } else {
      const tempBag = JSON.parse(localStorage.getItem("bagArray"));
      let itemIndex = tempBag.findIndex(item => item.style === style);
      tempBag.splice(itemIndex, 1);
      localStorage.setItem("bagArray", JSON.stringify(tempBag));
      this.setState({ products: tempBag });
    }
  }

  render() {
    let total = _.getTotal(this.state.products);

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
          <button onClick={() => this.updateQuantity(1)}>
            Increase Quantity
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

export default withContext(Bag);
