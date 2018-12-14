import React, { Component } from "react";
import firebase from "../firebase";
import Results from "./Results";
import { withRouter } from "react-router-dom";
import "./Search.scss";
import withContext from "../../context/Context_HOC";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      keyword: "",
      results: []
    };
    this.keyPress = this.keyPress.bind(this);
  }
  componentDidMount() {
    const itemRefs = firebase.database().ref("women");
    itemRefs.once("value").then(res => {
      console.log("item refs val", res.val());
      this.setState({
        products: res.val()
      });
    });
  }
  getKeyword(val) {
    this.setState({
      keyword: val
    });
  }
  keyPress(e) {
    if (e.keyCode === 13) {
      //   alert(`You typed ${this.state.keyword}`);
      this.search(this.state.keyword);
    }
  }
  search(keyword) {
    let results = [];
    let finalResults = [];
    for (let i in this.state.products) {
      console.log(this.state.products[i]);
      results = this.state.products[i].filter(key => key.name.toLowerCase().match(keyword));
      Object.assign(finalResults, results);
      console.log(finalResults);
    }
    this.setState({
      results: finalResults
    });

    // setTimeout(() => this.props.history.push("/results", this.state), 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.results !== this.state.results) {
      this.props.history.push("/results", this.state);
      this.props.context.toggleSearch();
    }
  }
  render() {
    const { results, keyword } = this.state;
    return (
      <div className="search-bar">
        <input placeholder="Search" onChange={e => this.getKeyword(e.target.value)} onKeyDown={this.keyPress} autoFocus />
        <i class="far fa-times-circle" onClick={this.props.context.toggleSearch} />
        {/* <Results results={results} keyword={keyword} /> */}
      </div>
    );
  }
}
export default withContext(withRouter(Search));
