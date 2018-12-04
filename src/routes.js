import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Bag from "./components/bag/Bag";
import Checkout from "./components/checkout/Checkout";

export default (
  <Switch>
    <Route path="/checkout" component={Checkout} />
    <Route path="/bag" component={Bag} />
    <Route path="/" component={Home} />
  </Switch>
);
