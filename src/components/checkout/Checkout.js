import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import _ from "../utils";
import { Link } from "react-router-dom";
import withContext from "../../context/Context_HOC";
import "./checkout.scss";
import firebase from "firebase";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || [],
      total: 0,
      showNumberBox: false
    };
  }

  componentDidMount() {
    this.props.context.authListenier();
    this.getBag();
  }

  componentDidUpdate(prevProps) {
    if (this.props.context !== prevProps.context) {
      this.getBag();
    }
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
    let totalQty = _.getTotalQty(this.state.products);
    const showProducts = this.state.products.map(product => {
      return (
        <div className="checkout-products">
          <img
            className="bag-product-img"
            src={_.white(product.images[0].image)}
            alt=""
          />
          <div>
            <span>{product.name}</span>
            <span>Qty: {product.quantity}</span>
            <h2>{product.price}</h2>
          </div>
        </div>
      );
    });
    return (
      <div className="checkout">
        {/* <Link to="/bag">
          <button>Back to Bag</button>
        </Link> */}
        <div className="checkout-details">
          <div className="checkout-name">
            <h2>YOU ARE CHECKING OUT AS:</h2>
            <h3>{this.props.context.user && this.props.context.user.email}</h3>
          </div>
          <h1>Shipping Address</h1>
          <h3>All fields are required except if mentioned optional.</h3>
          <h3 className="ship-to">SHIP T0</h3>
          <div>
            <input type="radio" id="huey" name="drone" value="huey" checked />
            <label for="huey"> New Address</label>
          </div>
          <div className="form">
            <div className="row">
              <div className="input-box">
                <label for="title">TITLE</label>
                <select className="title" id="title">
                  <option value="title">Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>
              <div className="input-box">
                <label for="first-name">FIRST NAME</label>
                <input type="text" id="first-name" />
              </div>
              <div className="input-box">
                <label for="last-name">LAST NAME</label>
                <input type="text" id="last-name" />
              </div>
            </div>
            <div className="row">
              <div className="input-box">
                <label for="address-1">ADDRESS LINE 1</label>
                <input type="text" id="address-1" />
              </div>
            </div>
            <div className="row">
              <div className="input-box">
                <label for="address-2">ADDRESS LINE 2 optional</label>
                <input type="text" id="address-2" />
              </div>
            </div>
            <div className="row">
              <div className="input-box">
                <label for="city">CITY</label>
                <input type="text" id="city" />
              </div>
              <div className="input-box">
                <label for="state">STATE</label>
                <input type="text" id="state" />
              </div>
              <div className="input-box">
                <label for="zip-code">ZIP CODE</label>
                <input type="text" id="zip-code" />
              </div>
            </div>
            <div className="row">
              <input type="checkbox" id="business" />
              <label for="business">This is a business address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-box">
              <label for="phone">
                CONTACT PHONE NUMBER In the event that our shipping partner
                needs to reach someone.
              </label>
              <div className="row">
                <input type="text" id="phone" value="🇺🇸 +1 United S..." />
                <input type="text" id="phone" />
              </div>
            </div>
          </div>
          <div className="row">
            <input
              type="checkbox"
              id="additional-number"
              checked={this.state.showNumberBox}
              onChange={() =>
                this.setState({ showNumberBox: !this.state.showNumberBox })
              }
            />
            <label for="additional-number">Add additional contact number</label>
          </div>
          <div className="row">
            <input type="checkbox" id="save" />
            <label for="save">
              Save shipping address information to address book
            </label>
          </div>
          {this.state.showNumberBox && (
            <div className="row">
              <div className="input-box">
                <label for="phone">ALTERNATE PHONE NUMBER</label>
                <div className="row">
                  <input type="text" id="phone" value="🇺🇸 +1 United S..." />
                  <input type="text" id="phone" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="order-sum-co">
          <h1>👜{totalQty} items</h1>
          <div>{showProducts}</div>
          <h2>TOTAL: $ {total}</h2>
          <StripeCheckout
            name="© G U C C I"
            image="http://desiderata.info/wp-content/uploads/Gucci-GG-logo.png"
            // White logo with black background:
            // image="http://www.noradot.com/wp-content/uploads/2016/10/gucci-desktop-6.jpg"
            amount={total * 100}
            token={this.onToken}
            email={
              this.props.context.user
                ? this.props.context.user.email
                : undefined
            }
            stripeKey="pk_test_FA9iXNKE4bHwWBQ0KlKbKOq2"
          />
        </div>
      </div>
    );
  }
}

export default withContext(Checkout);
