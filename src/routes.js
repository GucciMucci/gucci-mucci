import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Bag from "./components/bag/Bag";
import Checkout from "./components/checkout/Checkout";
import Display from "./components/Display/Display";
import Product from "./components/product/Product";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SavedItems from "./components/SavedItems/SavedItems";
import Results from "./components/Search/Results";
import Order from "./components/Order/Order";

export default (
  <Switch>
    <Route path="/order" component={Order} />
    <Route path="/results" component={Results} />
    <Route path="/profile" component={Profile} />
    <Route path="/saved-items" component={SavedItems} />
    <Route path="/women/:type/:name" component={Product} />
    <Route path="/women/:type" component={Display} />
    <Route path="/men/:type/:name" component={Product} />
    <Route path="/men/:type" component={Display} />
    <Route path="/jewelry-and-watches/:type/:name" component={Product} />
    <Route path="/jewelry-and-watches/:type" component={Display} />
    <Route path="/beauty/:type/:name" component={Product} />
    <Route path="/beauty/:type" component={Display} />
    <Route path="/login" component={Login} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/bag" component={Bag} />
    <Route path="/" component={Home} />
  </Switch>
);
