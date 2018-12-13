import React, { Component } from "react";
import "./hover.scss";

export default class Hover extends Component {
  render() {
    return (
      <div>
        {/* <td data-label="Edit"> */}
        <div className="btn_wrapper">
          <div className="btn">
            {this.props.children}
            <ul className="btn_subMenu">
              <this.props.content />
            </ul>
          </div>
        </div>
        {/* </td> */}
      </div>
    );
  }
}
