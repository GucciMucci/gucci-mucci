import React, { Component } from "react";
import "./Footy.scss";
import axios from "axios";
import withContext from "../../context/Context_HOC";

class Footy extends Component {
  constructor() {
    super();
    this.state = {
      newEmail: ""
    };
  }
  handleInput(val) {
    console.log(val);
    this.setState({
      newEmail: val
    });
  }
  welcomeEmail() {
    this.state.newEmail &&
      axios.post("/api/email", { email: this.state.newEmail }).then(res => {
        window.alert(`Thanks for signing up, ${this.state.newEmail}`);
      });
  }

  render() {
    return (
      <div className="footer">
        <div className="footer-nav">
          <div className="footer-section">
            <h2>EXCLUSIVE SERVICES</h2>
            <ul>
              <li>
                <i class="fas fa-gift" />
                Complimentary Gift Wrapping
              </li>
              <li>
                <i class="fas fa-utensils" />
                Gucci Ostera da Massimo Bottura
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>MAY WE HELP YOU</h2>
            <ul>
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Unsubscribe</li>
              <li>Payment Options</li>
              <li>Shipping Services</li>
              <li>Returns and Exchanges</li>
              <li>Product Care</li>
              <li>How to Shop Gucci.com</li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>THE COMPANY</h2>
            <ul>
              <li>About Gucci</li>
              <li>Gucci Equilibrium</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Privacy & Cookies</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>FIND US ON</h2>
            <ul>
              <li>
                <a href="https://www.facebook.com/GUCCI/" target="_blank">
                  <i class="fab fa-facebook-f" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/gucci" target="_blank">
                  <i class="fab fa-twitter" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/gucci/" target="_blank">
                  <i class="fab fa-instagram" /> Gucci
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/guccibeauty/" target="_blank">
                  <i class="fab fa-instagram" /> Gucci Beauty
                </a>
              </li>
              <li>
                <a href="http://www.youtube.com/gucciofficial" target="_blank">
                  <i class="fab fa-youtube" /> YouTube
                </a>
              </li>
              <li>
                <a href="https://plus.google.com/117338484400239480369" target="_blank">
                  <i class="fab fa-google-plus-square" /> Google+
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/gucci/" target="_blank">
                  <i class="fab fa-pinterest-p" /> Pinterest
                </a>
              </li>
              <li>
                <img src="https://www.gucci.com/_ui/responsive/common/images/snapchat_code-desktop.png" className="snap-icon" />
                <i class="fab fa-snapchat-ghost" /> Snapchat
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>SIGN UP FOR GUCCI UPDATES</h2>
            <p>By signing up, you accept the terms of Gucci's Privacy Policy</p>
            <div className="send-email">
              <input className="foot-input" placeholder="Email Address" onChange={e => this.handleInput(e.target.value)} />
              <button onClick={() => this.welcomeEmail()}>&gt;</button>
            </div>
            <h2>STORE LOCATOR</h2>
            <input className="foot-input" placeholder="City, country, region" />
          </div>
        </div>
      </div>
    );
  }
}
export default withContext(Footy);
