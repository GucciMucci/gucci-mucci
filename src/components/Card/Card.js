import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "../utils";
import heartOpen from "./heart-regular.svg";

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props.item };
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
	};

	render() {
		let { name, images, price } = this.state;
		images = _.sortURL(images);
		return (
			<div className="card">
				<Link to={window.location.pathname + "/" + name}>
					<img src={images[0].image} alt="" />
				</Link>
				<div className="hoverPopup">
					<img src={images[1].image} alt="" />
					<h1>{name}</h1>
					<p>{price}</p>
				</div>
				<img className="heart" src={heartOpen} alt="" />
			</div>
		);
	}
}

export default Card;
