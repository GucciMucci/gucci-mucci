import React, { Component } from "react";
import { Link } from "react-router-dom";

class Bottom extends Component {
  constructor() {
    super();
    this.state = {
      subCat: ["dresses", "coats"]
    };
  }
  render() {
    return (
      <div className="bottom">
        {this.state.subCat.map(cat => {
          return <Link to={cat}>{cat}</Link>;
        })}
      </div>
    );
  }
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.categories = {
      women: ["dresses", "coats"],
      men: ["sneakers", "bags"]
    };
  }
  render() {
    return (
      <nav className="middle">
        <a href="#">WOMEN</a>
        <Bottom />
      </nav>
    );
  }
}

export default Nav;
