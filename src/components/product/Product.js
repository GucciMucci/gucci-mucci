import React, { Component } from "react";
import firebase from "../firebase";
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
        console.log(data[index]);
        this.setState({
          product: data[index]
        });
      });
  }

  addToBag = product => {
    let localBag = localStorage.getItem("bagArray");
    if (localBag) {
      const tempBag = JSON.parse(localStorage.getItem("bagArray"));
      tempBag.push(product);
      localStorage.setItem("bagArray", JSON.stringify(tempBag));
    } else {
      localStorage.setItem("bagArray", JSON.stringify([product]));
    }
    console.log("---bagArray------->", localStorage.getItem("bagArray"));
    return localStorage;
  };

  render() {
    const { name, images, price, style } = this.state.product;
    console.log(images);
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
        <button onClick={this.addToBag}>Add to Cart</button>
      </div>
    ) : (
      ""
    );
  }
}

export default Product;
