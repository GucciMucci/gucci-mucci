import React, { Component } from "react";
import "./footer.scss";
export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-nav">
          <div>
            <h2>EXCLUSIVE SERVICES</h2>
            <ul>
              <li>Complimentary Two Day Shipping</li>
              <li>Complimentary Gift Wrapping</li>
              <li>Gucci Ostera da Massimo Bottura</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
