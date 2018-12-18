import React, { Component } from "react";
import withContext from "../../context/Context_HOC";
import firebase from "firebase";

class AddressForm extends Component {
  constructor() {
    super();
    this.state = {
      showNumberBox: false,
      selected: "radio-1",
      title: "",
      firstName: "",
      lastName: "",
      addressOne: "",
      addressTwo: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNum: "",
      additionalNum: "",
      business: false,
      fullAddress: null,
      saveAddress: false,
      useDefault: false
    };
  }

  getAddress = () => {
    const userRef = firebase
      .database()
      .ref(`users/${this.props.context.user.id}/address`);
    userRef.once("value").then(res => {
      let address = res.val();
      if (this.state.useDefault) {
        this.setState({
          title: address.title,
          firstName: address.firstName,
          lastName: address.lastName,
          addressOne: address.addressOne,
          addressTwo: address.addressTwo,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          phoneNum: address.phoneNum,
          additionalNum: address.additionalNum,
          business: address.business
        });
      } else
        this.setState({
          title: "",
          firstName: "",
          lastName: "",
          addressOne: "",
          addressTwo: "",
          city: "",
          state: "",
          zipCode: "",
          phoneNum: "",
          additionalNum: "",
          business: false
        });
    });
  };

  componentDidMount = () => {
    // this.getAddress();
  };

  componentDidUpdate(prevProps) {
    if (this.props.context !== prevProps.context) {
      if (this.props.context.user) {
        this.getAddress();
      }
    }
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const fullAddress = {
      title: this.state.title,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      addressOne: this.state.addressOne,
      addressTwo: this.state.addressTwo,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      phoneNum: this.state.phoneNum,
      additionalNum: this.state.additionalNum,
      business: this.state.business
    };
    this.setState({ fullAddress: fullAddress });
    if (this.state.saveAddress) {
      this.saveAddress(fullAddress);
    }
  };

  saveAddress = newAddress => {
    const userRef = firebase
      .database()
      .ref(`users/${this.props.context.user.id}/address`);
    userRef.once("value").then(() => {
      userRef.set(newAddress);
    });
  };

  render() {
    console.log("this.state---------->", this.state);
    return (
      <div className="checkout-details">
        <div className="checkout-name">
          <h2>YOU ARE CHECKING OUT AS:</h2>
          {this.props.context.user ? (
            <h3>{this.props.context.user.email}</h3>
          ) : (
            <h3>Guest</h3>
          )}
        </div>
        <h1>Shipping Address</h1>
        <h3>All fields are required except if mentioned optional.</h3>
        {/* <label className="ship-to">SHIP T0:</label> */}
        {this.props.context.user && (
          <div>
            <input
              type="checkbox"
              id="huey"
              checked={this.state.useDefault}
              name="useDefault"
              value={this.state.useDefault}
              onChange={e => {
                this.handleChange(e);
                this.getAddress();
              }}
            />
            <label for="huey">Use Default Address</label>
          </div>
        )}
        {/* form */}
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-box" id="title">
              <label for="title">TITLE</label>
              <select
                className="soflow white"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              >
                <option value="">Title</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
            <div className="input-box" id="first-name">
              <label for="first-name">FIRST NAME</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-box" id="last-name">
              <label for="last-name">LAST NAME</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-box">
              <label for="address-1">ADDRESS LINE 1</label>
              <input
                type="text"
                id="address-1"
                name="addressOne"
                value={this.state.addressOne}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-box">
              <label for="address-2">
                ADDRESS LINE 2 <span className="optional"> optional</span>
              </label>
              <input
                type="text"
                id="address-2"
                name="addressTwo"
                value={this.state.addressTwo}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-box" id="city">
              <label for="city">CITY</label>
              <input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-box" id="state">
              <label for="state">STATE</label>
              <input
                type="text"
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-box" id="zip-code">
              <label for="zip-code">ZIP CODE</label>
              <input
                type="text"
                name="zipCode"
                value={this.state.zipCode}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row checkbox">
            <input
              type="checkbox"
              id="business"
              name="business"
              value={this.state.business}
              onChange={this.handleChange}
            />
            <label for="business">This is a business address</label>
          </div>
          <div className="row">
            <div className="input-box">
              <label for="phone">
                CONTACT PHONE NUMBER{" "}
                <span className="optional">
                  In the event that our shipping partner needs to reach someone.
                </span>
              </label>
              <div className="row">
                <div className="phone">
                  <input type="text" value="🇺🇸 +1 United S..." />
                </div>

                <div className="phone">
                  <input
                    type="text"
                    name="phoneNum"
                    value={this.state.phoneNum}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row checkbox">
            <input
              type="checkbox"
              id="additional-number"
              checked={this.state.showNumberBox}
              onChange={() =>
                this.setState({ showNumberBox: !this.state.showNumberBox })
              }
            />
            <label for="additional-number">Add additional contact number</label>
          </div>
          {this.props.context.user && (
            <div className="row checkbox">
              <input
                type="checkbox"
                id="save"
                name="saveAddress"
                value={this.state.saveAddress}
                onChange={this.handleChange}
              />
              <label for="save">Save as default shipping address</label>
            </div>
          )}
          {this.state.showNumberBox && (
            <div className="row">
              <div className="input-box" id="extra-phone">
                <label for="phone">ALTERNATE PHONE NUMBER</label>
                <div className="row">
                  <div className="phone">
                    <input type="text" value="🇺🇸 +1 United S..." />
                  </div>

                  <div className="phone">
                    <input
                      type="text"
                      name="phoneNum"
                      value={this.state.phoneNum}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="radio-group">
            <div className="row">
              <label id="shipping">SHIPPING METHOD</label>
            </div>
            <div>
              <input
                className="radio"
                type="radio"
                id="radio-1"
                name="myRadio"
                value="radio-1"
                checked={this.state.selected === "radio-1"}
                onChange={e => this.setState({ selected: e.target.value })}
              />
              <label for="radio-1"> Two Day</label>
              <span> - Free</span>
              {this.state.selected === "radio-1" && (
                <span> You will be notified when your item is shipped</span>
              )}
              <br />
              <input
                className="radio"
                type="radio"
                id="radio-2"
                name="myRadio"
                value="radio-2"
                checked={this.state.selected === "radio-2"}
                onChange={e => this.setState({ selected: e.target.value })}
              />
              <label for="radio-2"> Ground</label>
              <span> - Free</span>
              {this.state.selected === "radio-2" && (
                <span>
                  Your order will be delivered within 7 business days. You will
                  be notified when your item is shipped.
                </span>
              )}
              <br />
              <input
                className="radio"
                type="radio"
                id="radio-3"
                name="myRadio"
                value="radio-3"
                checked={this.state.selected === "radio-3"}
                onChange={e => this.setState({ selected: e.target.value })}
              />
              <label for="radio-3"> Next Day</label>
              <span> - $ 35.00</span>
              {this.state.selected === "radio-3" && (
                <span>
                  Please allow 1-2 business days for your order to ship
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <button type="submit" value="Submit">
              CONTINUE TO PAYMENT
            </button>
          </div>
          <p>All items ship in Gucci signature packaging.</p>
        </form>
      </div>
    );
  }
}

export default withContext(AddressForm);
