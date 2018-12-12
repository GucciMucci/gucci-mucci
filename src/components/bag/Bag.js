import React, { Component } from "react";
import { Link } from "react-router-dom";
import withContext from "../../context/Context_HOC";
import firebase from "../firebase";
import _ from "../utils";
import "./bag.scss";
import heartOpen from "../Card/heart-regular.svg";
import CheckoutAccordion from "../CheckoutAccordion/CheckoutAccordion";

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
      const usersRef = firebase
        .database()
        .ref(`users/${this.props.context.user.id}/cart`);
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

  updateQuantity(style, amount) {
    const products = this.state.products;
    let itemIndex = products.findIndex(item => item.style === style);
    products[itemIndex].quantity = amount;
    this.setState({ products: products });
    if (this.props.context.user) {
      const userRef = firebase
        .database()
        .ref(`users/${this.props.context.user.id}/cart`);
      userRef.once("value").then(res => {
        let cart = res.val();
        cart = products;
        userRef.set(cart);
      });
    } else {
      localStorage.setItem("bagArray", JSON.stringify(products));
    }
  }

  clickSave(product) {
    this.props.context.addFav(product);
    this.removeFromBag(product.style);
  }

  render() {
    let total = _.getTotal(this.state.products);
    console.log("this.state.products---------->", this.state.products);
    const showProducts = this.state.products.map(product => {
      return (
        <div key={product.style} className="bag-product">
          <img
            className="bag-product-img"
            src={product.images[1].image}
            alt=""
          />
          <div className="product-details">
            <div>
              <h1>{product.name}</h1>
              <h3>Style# {product.style}</h3>
              <h3>Style: Product style description</h3>
              <h3>Qty: {product.quantity} </h3>
            </div>
            <div>
              <span>AVAILABLE</span>
              <p>Your selection is available for immediate purchase online.</p>
              <p>You will be notified when your item is shipped.</p>
            </div>
            <div className="options">
              <span>Edit</span>
              <span onClick={() => this.removeFromBag(product.style)}>
                | Remove
              </span>
              <span onClick={() => this.clickSave(product)}>
                | <img src={heartOpen} alt="" />
                Saved Items
              </span>
            </div>
          </div>
          <span className="qty-price">
            <select
              id="soflow"
              className="select-qty"
              onChange={e =>
                this.updateQuantity(product.style, parseInt(e.target.value))
              }
              value={product.quantity}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <h3>{product.price}</h3>
          </span>
        </div>
      );
    });
    return (
      <div className="bag-page">
        <div className="bag-header">
          <h1>Shopping Bag</h1>
        </div>
        {this.state.products && (
          <div className="bag">
            <div className="bag-products">
              <div className="heading">
                <h2>YOUR SELECTIONS</h2>
                <h3>🖨 Print</h3>
              </div>
              {showProducts}
            </div>

            <div className="bag-right">
              <div className="order-sum">
                <h2 className="heading-sum">ORDER SUMMARY</h2>
                <ul>
                  <li>
                    <span>Subtotal</span> <span>$ {total}</span>
                  </li>
                  <li>
                    <span>Shipping</span> <span>Free (Next Day) v</span>
                  </li>
                  <li>
                    <span>Estimated Tax</span> <span>Calculate</span>
                  </li>
                  <li>
                    <span>Estimated Total</span>{" "}
                    <span id="total-cart">$ {total}</span>
                  </li>
                </ul>
                <div>
                  <h2>VIEW DETAILS</h2>
                  <p>
                    You will be charged only at the time of shipment except for
                    DIY orders where the full amount is charged at the time of
                    purchase.
                  </p>
                </div>
                <div className="bag-btns">
                  <Link to="/checkout">
                    <button className="checkout-btn">CHECKOUT</button>
                  </Link>
                  <div>OR</div>
                  <button className="pay-pal-btn">PAY WITH ©PayPal</button>
                </div>
              </div>
              <CheckoutAccordion />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withContext(Bag);
