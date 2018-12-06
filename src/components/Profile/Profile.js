import React, { Component } from "react";
import withContext from "../../context/Context_HOC";

class Profile extends Component {
  render() {
    console.log("context", this.props.context);
    return (
      <div>
        <div>
          <h1>Welcome, {this.props.context.user && this.props.context.user.email}</h1>
        </div>
      </div>
    );
  }
}

export default withContext(Profile);
