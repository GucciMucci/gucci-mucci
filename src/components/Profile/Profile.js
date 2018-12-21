import React, { Component } from "react";
import withContext from "../../context/Context_HOC";
import "./Profile.scss";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    console.log("context", this.props.context);
    return (
      <div className="profile">
        <div className="profile-header">
          <h1>
            Welcome, {this.props.context.user && this.props.context.user.email}
          </h1>
        </div>

        <div className="profile-container">
          <div className="recommend">
            <img
              src="http://media.gucci.com/content/DarkGray_AccountLandingRecommendedWishlist_Standard_504x504/1541006105/AccountLandingRecommendedWishlist_S91CRUISE-01_001_Light.jpg"
              className="pic-holder"
              alt=""
            />
            <h1>Recomendations</h1>
            <p>Specially selected items you may also like</p>
          </div>
          <div className="saved">
            <Link to="/saved-items">
              <img
                src="http://media.gucci.com/content/DarkGray_AccountLandingRecommendedWishlist_Standard_504x504/1541006105/AccountLandingRecommendedWishlist_S91CRUISE-02_001_Light.jpg"
                className="pic-holder"
                alt=""
              />
              <h1>Saved Items</h1>
            </Link>
            <p>All your favorite pieces in one beautiful place.</p>
          </div>
        </div>

        <Link to="/history">
          <div className="profile-his" style={{ color: "black" }}>
            Order History
          </div>
        </Link>
      </div>
    );
  }
}

export default withContext(Profile);
