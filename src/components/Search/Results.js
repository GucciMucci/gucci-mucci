import React, { Component } from "react";
import "./Results.scss";

export default class Results extends Component {
  render() {
    const { results, keyword } = this.props.location.state;

    const showResults =
      results &&
      results.map(result => {
        return (
          <div>
            <h1>{result.name}</h1>
          </div>
        );
      });

    return (
      <div>
        {keyword && (
          <div>
            <div className="result-head">
              <h3>{results.length} Results found for:</h3>
              <h1>"{keyword}"</h1>
            </div>
          </div>
        )}
        <div>{showResults}</div>
      </div>
    );
  }
}
