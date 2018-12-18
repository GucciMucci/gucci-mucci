import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import _ from "../utils";
import withContext from "../../context/Context_HOC";
import "./checkout.scss";
import firebase from "firebase";
import CheckoutAccordion from "../CheckoutAccordion/CheckoutAccordion";
import AddressForm from "../AddressForm/AddressForm";
import bag from "./bag.svg";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem("bagArray")) || [],
      total: 0
    };
  }

  componentDidMount() {
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

  saveOrderToHistory = order => {
    const userRef = firebase.database().ref(`users/${this.props.context.user.id}/orders`);
    userRef.once("value").then(res => {
      let orders = res.val();
      if (orders !== null) {
        userRef.set([...orders, order]);
      } else {
        userRef.set([order]);
      }
    });
  };

  deleteBag = () => {
    if (this.props.context.user) {
      const userRef = firebase.database().ref(`users/${this.props.context.user.id}/cart`);
      userRef.once("value").then(() => {
        userRef.set([]);
      });
    } else localStorage.setItem("bagArray", JSON.stringify([]));
  };

  onToken = token => {
    let total = _.getTotal(this.state.products);
    axios
      .post("/api/stripe", {
        method: "POST",
        body: token,
        amount: total * 100
      })
      .then(res => {
        console.log("res---------->", res);
        this.saveOrderToHistory(this.state.products);
        if (this.props.context.user) {
          this.deleteBag();
        }
        console.log("first res", res.data);
        axios.post("/api/reciept", { email: this.props.context.user.email, message: this.state.products, total: total }).then(res2 => {
          console.log("second res", res2.data);
          // alert(`Email sent to ${this.props.context.user.email}`);
          this.props.history.push("/order", this.state.products);
        });
      });
  };

  render() {
    let total = _.getTotal(this.state.products);
    let totalQty = _.getTotalQty(this.state.products);
    const showProducts = this.state.products.map(product => {
      return (
        <div className="checkout-products">
          <img className="chk-product-img" src={_.white(product.images[1].image)} alt="" />
          <div className="co-mid">
            <h2>{product.name}</h2>
            <h3>Style# {product.style}</h3>
            <div className="selection-div">
              <h2>AVAILABLE</h2>
              <p className="selection">Your selection is available for immediate purchase online.</p>
            </div>
          </div>
          <div className="co-right">
            <h2>Qty: {product.quantity}</h2>
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
        <AddressForm />
        <div>
          <div className="order-sum-co">
            <h1>
              <img id="bag-svg" src={bag} alt="" />
              {totalQty} {totalQty === 1 ? <p>item</p> : <p>items</p>}
            </h1>
            <div>{showProducts}</div>
            <div className="order-sum">
              <ul>
                <li>
                  <span>Subtotal</span> <span>$ {total}</span>
                </li>
                <li>
                  <span>Shipping</span> <span>Free (Next Day) v</span>
                </li>
                <li>
                  <span>Estimated Tax</span> <span>$ 0</span>
                </li>
                <li>
                  <span>Estimated Total</span> <span id="total-co">$ {total}</span>
                </li>
              </ul>
            </div>
            <StripeCheckout
              name="© G U C C I"
              image="http://desiderata.info/wp-content/uploads/Gucci-GG-logo.png"
              // White logo with black background:
              // image="http://www.noradot.com/wp-content/uploads/2016/10/gucci-desktop-6.jpg"
              amount={total * 100}
              token={this.onToken}
              email={this.props.context.user ? this.props.context.user.email : undefined}
              description="Thank you for buying from Mucci"
              stripeKey="pk_test_FA9iXNKE4bHwWBQ0KlKbKOq2"
            />
            <div>
              <h2 id="view-det">VIEW DETAILS</h2>
              <p className="detail-paragraph">
                You will be charged only at the time of shipment except for DIY orders where the full amount is charged at the time of
                purchase.
              </p>
            </div>
          </div>
          <CheckoutAccordion />
        </div>
      </div>
    );
  }
}

export default withContext(Checkout);
