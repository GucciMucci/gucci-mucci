import React, { Component } from "react";
import _ from "../utils";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.item };
  }
  render() {
    let { name, images, price } = this.state;
    images = _.sortURL(images);
    return (
      <div>
        <h1>{name}</h1>
        <img src={images[0].image} alt="" />
        <p>{price}</p>
      </div>
    );
  }
}

export default Card;
