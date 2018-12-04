import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Bag from "./components/bag/Bag";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/Login/Login";

export default (
	<Switch>
		<Route path="/checkout" component={Checkout} />
		<Route path="/bag" component={Bag} />
		<Route path="/login" component={Login} />
		<Route path="/" component={Home} />
	</Switch>
);
