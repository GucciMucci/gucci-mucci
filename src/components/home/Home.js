import React, { Component } from "react";
import "./home.scss";
import diamond from "./../../diamond.svg";
import firebase from "../firebase";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      currentItem: "",
      data: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("frontpage")
      .once("value")
      .then(snapshot => {
        this.setState({
          data: snapshot.val()
        });
      });
  }

  render() {
    return (
      <div>
        <div className="home-header">
          <div className="head-content">
            <div>GUCCI IN COLLABORATION WITH</div>
            <h1>CHATEAU MARMONT</h1>
            <button>SHOP</button>
          </div>
        </div>

        <div className="home-body">
          <div className="home-middle">
            <img src="http://media.gucci.com/content/ProductPushGif_Standard_700x700/1543248903/ProductPushGif_55240393YAT1086-55240393YAT9563_001_Default.gif" />

            <div className="middle-box">
              <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_492347XJAN47263_001_Light.jpg" />
              <h3>Luggage</h3>
              <p>An unconventional approach to the classic tote, inspired by hotel laundry bags.</p>
              <div>MORE</div>
            </div>
          </div>
          <div className="text-banner">
            <p>HANDBAGS</p>
            <h3>Drawstring tote with Chateau Marmont print</h3>
            <img src={diamond} className="diamond" />
            <button>SHOP</button>
          </div>
          <div className="big-container">
            <div className="big-pic">
              <div className="top">
                <div className="middle-box">
                  <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_545969ZAABC4240_001_Light.jpg" />
                  <h3>Jackets</h3>
                  <p>Chateau Marmont is embroidered on the back of this preppy-inspired jacket, in a whimsical blend of genres.</p>
                  <div>MORE</div>
                </div>
              </div>
              <div className="mid">
                <div className="middle-box">
                  <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_492347XJAN47263_001_Light.jpg" />
                  <h3>T-shirts</h3>
                  <p>Pan, the mascot of the famous hotel in Hollywood is a half-man/half-beast Greek god.</p>
                  <div>MORE</div>
                </div>
              </div>
              <div className="bottom">
                <div className="middle-box">
                  <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_469250XJAOH9395_001_Light.jpg" />
                  <h3>Sweatshirts</h3>
                  <p>Linked to the cultural influences behind Cruise 2019, the hotel's gothic logo is printed on a Gucci sweatshirt.</p>
                  <div>MORE</div>
                </div>
              </div>
            </div>
            <div className="text-banner">
              <p>CHATEAU MARMONT</p>
              <h3>Ready-To-Wear</h3>
              <img src={diamond} className="diamond" />
              <button>SHOP</button>
            </div>
          </div>
          <div className="shoe">
            <div className="shoe-pic" />
          </div>
        </div>
      </div>
    );
  }
}
