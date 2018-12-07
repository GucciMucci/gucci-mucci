import React, { Component } from "react";
import firebase from "../firebase";
import withContext from "../../context/Context_HOC";
import "./product.scss";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    let url = window.location.pathname.split("/");
    firebase
      .database()
      .ref(url[url.length - 3] + "/" + url[url.length - 2])
      .once("value")
      .then(snapshot => {
        let data = snapshot.val();
        let index = data.findIndex(item => item.name === url[url.length - 1].replace(/%20/g, " "));
        this.setState({
          product: data[index]
        });
      });
  }

  addToBag = product => {
    let localBag = localStorage.getItem("bagArray");
    product.quantity = 1;
    if (this.props.context.user.id) {
      const usersRef = firebase.database().ref(`users/${this.props.context.user.id}/cart`);
      usersRef.once("value").then(res => {
        let cart = res.val();
        let index = cart ? cart.findIndex(item => item.style === product.style) : -1;
        console.log(index);
        if (index !== -1) {
          cart[index].quantity += 1;
          usersRef.set(cart);
        } else if (cart) {
          usersRef.set([...cart, product]);
        } else {
          usersRef.set([product]);
        }
      });
    } else {
      if (localBag) {
        const tempBag = JSON.parse(localStorage.getItem("bagArray"));
        tempBag.push(product);
        localStorage.setItem("bagArray", JSON.stringify(tempBag));
      } else {
        localStorage.setItem("bagArray", JSON.stringify([product]));
      }
      return localStorage;
    }
  };

  render() {
    const { name, images, price, style } = this.state.product;

    return this.state.product.images ? (
      <div className="product">
        <div className="images">
          {images.map(image => {
            return <img src={image.image} alt="" />;
          })}
        </div>
        <h1>{name}</h1>
        <h3>{price}</h3>
        <h3>{style}</h3>
        <button
          onClick={() => {
            this.addToBag(this.state.product);
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            this.props.context.addFav(this.state.product);
          }}
        >
          Favorite
        </button>
      </div>
    ) : (
      ""
    );
  }
}

export default withContext(Product);
