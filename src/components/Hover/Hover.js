import React, { Component } from "react";
import "./hover.scss";

export default class Hover extends Component {
  render() {
    return (
      <div>
        {/* <td data-label="Edit"> */}
        <div class="btn_wrapper clearfix">
          <div class="btn">
            {this.props.children}
            <ul class="btn_subMenu clearfix">
              <this.props.content />
            </ul>
          </div>
        </div>
        {/* </td> */}
      </div>
    );
  }
}
