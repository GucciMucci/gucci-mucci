import React, { Component } from "react";
import "./header.scss";
import { Link } from "react-router-dom";

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<Link to="/">
					<span>GUCCI</span>
				</Link>
				<Link to="/bag">
					<span className="bag-link">👜</span>
				</Link>
				<nav>
					<Link to="/women/dresses">Women</Link>
				</nav>
			</div>
		);
	}
}
