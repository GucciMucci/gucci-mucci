import React, { Component } from "react";
import "./hover.scss";

export default class Hover extends Component {
  render() {
    return (
      <div>
        {/* <td data-label="Edit"> */}
        <div class="btn_wrapper">
          <div class="btn">
             {this.props.button}
            <ul class="btn_subMenu">
              <this.props.content />
            </ul>
          </div>
        </div>
        {/* </td> */}
      </div>
    );
  }
}
