import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Bag from "./components/bag/Bag";
import Checkout from "./components/checkout/Checkout";
import Display from "./components/Display/Display";

export default (
	<Switch>
		<Route path="/women/:type" component={Display} />
		<Route path="/men/:type" component={Display} />
		<Route path="/jewelry-and-watches/:type" component={Display} />
		<Route path="/beauty/:type" component={Display} />
		<Route path="/checkout" component={Checkout} />
		<Route path="/bag" component={Bag} />
		<Route path="/" component={Home} />
	</Switch>
);
