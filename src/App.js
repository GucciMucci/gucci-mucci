import React, { Component } from "react";
import "reset-css";
import "./App.scss";
import Header from "./components/header/Header";
import Footy from "./components/Footy/Footy";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="not-nav">{routes}</div>
        <Footy />
      </div>
    );
  }
}

export default App;
