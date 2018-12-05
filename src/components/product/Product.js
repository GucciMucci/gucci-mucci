import React, { Component } from "react";
import firebase from "../firebase";

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

	render() {
		const { name, images, price } = this.state.product;
		console.log(images);
		return this.state.product.images ? (
			<div>
				<h1>{name}</h1>
				<div className="images">
					{images.map(image => {
						return <img src={image.image} alt="" />;
					})}
				</div>
				<h3>{price}</h3>
			</div>
		) : (
			""
		);
	}
}

export default Product;
