import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "../utils";
import heartOpen from "./heart-regular.svg";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.item };
  }

  render() {
    let { name, images, price } = this.state;
    images = _.sortURL(images);
    return (
      <div className="card">
        <Link to={window.location.pathname + "/" + name}>
          <img src={images[0].image} alt="" />
          <div className="hoverPopup">
            <img src={_.white(images[1].image)} alt="" />
            <h1>{name}</h1>
            <h2>{price}</h2>
            <p>SHOP THIS ></p>
          </div>
          <img className="heart" src={heartOpen} alt="" />
        </Link>
      </div>
    );
  }
}

export default Card;
