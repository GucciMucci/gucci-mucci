import React, { Component } from "react";
import "reset-css";
import "./App.scss";
import Header from "./components/header/Header";
import routes from "./routes";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="not-nav">{routes}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
