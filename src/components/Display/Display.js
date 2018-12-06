import React, { Component } from "react";
import "./display.scss";
import Card from "../Card/Card";
import firebase from "../firebase";

export default class Display extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			currentItem: "",
			data: []
		};
		this.route = window.location.pathname;
	}

	componentDidMount() {
		firebase
			.database()
			.ref(this.route)
			.once("value")
			.then(snapshot => {
				this.setState({
					data: snapshot.val()
				});
			});
	}

	render() {
		return (
			<div className="products">
				{this.state.data.map(item => (
					<Card key={item.style} item={item} />
				))}
			</div>
		);
	}
}
