import React, { Component } from "react";
import firebase from "../firebase";
import withContext from "../../context/Context_HOC";
import MucciSlider from "./MucciSlider";
import "./product.scss";
import heart from "../Card/heart-regular.svg";
import _ from "../utils";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    let url = window.location.pathname.split("/");
    let path = url[url.length - 3] + "/" + url[url.length - 2];
    firebase
      .database()
      .ref(path)
      .once("value")
      .then(snapshot => {
        let data = snapshot.val();
        let name = decodeURIComponent(url[url.length - 1]);
        let index = data.findIndex(item => item.name === name);
        this.setState({
          product: data[index]
        });
      });
  }

  // addToBag = product => {
  //   product.quantity = 1;
  //   if (this.props.context.user) {
  //     const usersRef = firebase.database().ref(`users/${this.props.context.user.id}/cart`);
  //     usersRef.once("value").then(res => {
  //       let cart = res.val();
  //       let index = cart ? cart.findIndex(item => item.style === product.style) : -1;
  //       if (index !== -1) {
  //         if (cart[index].quantity < 5) {
  //           cart[index].quantity += 1;
  //           usersRef.set(cart);
  //         } else this.setState({ showMemo: true });
  //       } else if (cart) {
  //         usersRef.set([...cart, product]);
  //       } else {
  //         usersRef.set([product]);
  //       }
  //     });
  //   } else {
  //     let localBag = localStorage.getItem("bagArray");
  //     if (localBag) {
  //       const tempBag = JSON.parse(localStorage.getItem("bagArray"));
  //       const index = tempBag.findIndex(item => item.style === product.style);
  //       if (index !== -1) {
  //         if (tempBag[index].quantity < 5) {
  //           tempBag[index].quantity += 1;
  //         } else this.setState({ showMemo: true });
  //       } else {
  //         tempBag.push(product);
  //       }
  //       localStorage.setItem("bagArray", JSON.stringify(tempBag));
  //     } else {
  //       localStorage.setItem("bagArray", JSON.stringify([product]));
  //     }
  //     return localStorage;
  //   }
  // };

  render() {
    const {
      name,
      images,
      price,
      style,
      description,
      details
    } = this.state.product;

    return this.state.product.images ? (
      <div className="product">
        <div className="images">
          <MucciSlider images={images} />
          <img
            className="heart"
            src={heart}
            alt=""
            onClick={() => {
              this.props.context.addFav(this.state.product);
            }}
          />
        </div>
        <div className="product-info">
          <h1>{name}</h1>
          <h2>{price}</h2>
          <h3>Style {style}</h3>

          <button
            className="add-to-bag"
            onClick={() => {
              this.props.context.addToBag(this.state.product);
            }}
          >
            ADD TO SHOPPING BAG
          </button>
          {this.props.context.showMemo && (
            <p style={{ color: "red" }}>Product exceeded maximum quantity.</p>
          )}
          {this.props.context.showAdd && <p>Added to cart</p>}
        </div>
        <div className="details">
          <main>
            <hr />
            <div className="accordian">
              <h6>SHIPPING INFO</h6>
              <p>
                For the continental U.S., we offer free FedEx ground shipping.
                We also offer two-day shipping for $25 and next-day delivery
                options for $35.*
              </p>
              <p>
                For Hawaii, Alaska and Puerto Rico, we offer two-day shipping
                for $25 and next-day shipping for $35.
              </p>
              <p>
                All ground, next-day and two-day deliveries are shipped via
                FedEx.*
              </p>
              <p>
                Additional shipping information is available during the checkout
                process.
              </p>
              <p>*Exceptions may apply for selected Home products.</p>
            </div>
            <div className="accordian">
              <h6>GIFT WRAPPING</h6>
              <div>
                <img
                  src="https://media.gucci.com/content/WrappingPdp_Standard_264x199/1542268803/WrappingPdp_GiftGiving18-wrap_001_Default.jpg"
                  alt=""
                />
                <img
                  src="https://media.gucci.com/content/WrappingPdp_Standard_264x199/1542269703/WrappingPdp_GiftGiving18-detail_001_Default.jpg"
                  alt=""
                />
                <h5>Complimentary Gift Wrapping</h5>
                <p>
                  All items will be delivered with our signature Gucci
                  packaging.
                </p>
              </div>
            </div>
          </main>
          <aside>
            <img src={_.white(images[1].image)} alt="" />
            <h4>Product Details</h4>
            <p>{description}</p>
            <ul>
              {details.map(detail => {
                return <li key={detail.name}>{detail.name}</li>;
              })}
            </ul>
          </aside>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default withContext(Product);
export { Product };
