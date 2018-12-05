import React, { Component } from "react";

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { name, images, price } = product;
		return (
			<div>
				<h1>{name}</h1>
				<div className="images">
					<img src={image} alt="" />
				</div>
				<h3>{price}</h3>
			</div>
		);
	}
}

export default Product;
