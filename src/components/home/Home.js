import React, { Component } from "react";
import "./home.scss";
import Card from "../Card/Card";
import firebase from "../firebase";

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			currentItem: "",
			data: []
		};
	}

	componentDidMount() {
		firebase
			.database()
			.ref("frontpage")
			.once("value")
			.then(snapshot => {
				this.setState({
					data: snapshot.val()
				});
			});
	}

	render() {
		return (
			<div>
				<p>Stuff goes here</p>
			</div>
		);
	}
}
