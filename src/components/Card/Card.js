import React, { Component } from "react";
import _ from "../utils";

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
			<div>
				<h1>{name}</h1>
				<img src={images[0].image} alt="" />
				<p>{price}</p>
				<button onClick={() => this.addToBag(this.state)}>👜</button>
			</div>
		);
	}
}

export default Card;
