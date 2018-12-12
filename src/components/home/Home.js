import React, { Component } from "react";
import "./home.scss";
import diamond from "./../../diamond.svg";
import firebase from "../firebase";

class Modal extends Component {
  render() {
    const { image, thumb, title, body } = this.props.info;
    return (
      <div className="modal">
        <div className="modal-content">
          <img src={image} />
          <div className="right">
            <span onClick={() => this.props.close()}>&times;</span>
            <img src={thumb} />
            <h2>CRUISE 2019</h2>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      currentItem: "",
      data: [],
      toggle: false,
      modalInfo: [
        {
          image:
            "http://media.gucci.com/content/VignetteOverlayBackground_Standard_757x527/1543248903/VignetteOverlayBackground_469250XJAOH9395_001_Default.jpg",
          thumb: "http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_469250XJAOH9395_001_Light.jpg",
          title: "Sweatshirts",
          body:
            "The infamous Chateau Marmont has undergone the '60s counterculture, the '70s rock'n'roll decadence and the ‘80s glamour lifestyle."
        },
        {
          image:
            "http://media.gucci.com/content/VignetteOverlayBackground_Standard_757x527/1543248903/VignetteOverlayBackground_492347XJAN47263_001_Default.jpg",
          thumb: "http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_492347XJAN47263_001_Light.jpg",
          title: "T-shirts",
          body: "The back of the T-shirt is a printed floral bouquet, taken from Gucci’s historic Flora motif."
        },
        {
          image:
            "http://media.gucci.com/content/VignetteOverlayBackground_Standard_757x527/1543248903/VignetteOverlayBackground_545969ZAABC4240_001_Default.jpg",
          thumb: "http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_545969ZAABC4240_001_Light.jpg",
          title: "Jackets",
          body: "Surrounded by historic film studios and shining neon lights, the Chateau Marmont was founded in the 1920s."
        },
        {
          image:
            "http://media.gucci.com/content/VignetteOverlayBackground_Standard_757x527/1543249804/VignetteOverlayBackground_55240393YAT9563_001_Default.jpg",
          thumb: "http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_492347XJAN47263_001_Light.jpg",
          title: "Luggage",
          body: "Images from the famous Hollywood hotel—Chateau Marmont—influence the collection."
        },
        {
          image:
            "http://media.gucci.com/content/VignetteOverlayBackground_Standard_757x527/1543248904/VignetteOverlayBackground_552093A9L009522_001_Default.jpg",
          thumb: "http://media.gucci.com/content/LightGray_Vignette_Standard_80x80/1543248904/Vignette_552093A9L009522_001_Light.jpg",
          title: "Sneakers",
          body: "Eighties influences run throughout the Cruise collection, found in ready-to-wear and accessories."
        }
      ],
      modal: {}
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

  toggleModal = id => {
    this.setState({ modal: this.state.modalInfo[id], toggle: !this.state.toggle });
  };

  render() {
    return (
      <div className={this.state.toggle ? "no-scroll" : ""}>
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
              <div onClick={() => this.toggleModal(3)} className="more">
                MORE &gt;
              </div>
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
                  <div onClick={() => this.toggleModal(2)} className="more">
                    MORE &gt;
                  </div>
                </div>
              </div>
              <div className="mid">
                <div className="middle-box">
                  <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_492347XJAN47263_001_Light.jpg" />
                  <h3>T-shirts</h3>
                  <p>Pan, the mascot of the famous hotel in Hollywood is a half-man/half-beast Greek god.</p>
                  <div onClick={() => this.toggleModal(1)} className="more">
                    MORE &gt;
                  </div>
                </div>
                {this.state.toggle && <Modal info={this.state.modal} close={this.toggleModal} />}
              </div>
              <div className="bottom">
                <div className="middle-box">
                  <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_160x160/1543248904/Vignette_469250XJAOH9395_001_Light.jpg" />
                  <h3>Sweatshirts</h3>
                  <p>Linked to the cultural influences behind Cruise 2019, the hotel's gothic logo is printed on a Gucci sweatshirt.</p>
                  <div onClick={() => this.toggleModal(0)} className="more">
                    MORE &gt;
                  </div>
                </div>
                {this.state.toggle && <Modal info={this.state.modal} close={this.toggleModal} />}
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
            <div className="more-shoe">
              <div className="middle-box">
                <img src="http://media.gucci.com/content/LightGray_Vignette_Standard_80x80/1543248904/Vignette_552093A9L009522_001_Light.jpg" />
                <h3>Sneakers</h3>
                <p>A retro design treated for a vintage, distressed effect.</p>
                <div onClick={() => this.toggleModal(4)} className="more">
                  MORE &gt;
                </div>
              </div>
              {this.state.toggle && <Modal info={this.state.modal} close={this.toggleModal} />}
            </div>
          </div>
          <div className="text-banner">
            <p>WOMEN'S SHOES</p>
            <h3>Rhyton sneaker with mouth print</h3>
            <img src={diamond} className="diamond" />
            <button>SHOP SNEAKERS</button>
          </div>
          <div>
            <div className="petra">
              <div className="middle-box">
                <h3>The Party</h3>
                <p>A kaleidoscopic party, presenting the Gift 2018 campaign shot by Petra Collins.</p>
                <div className="more">THE GIFT 2018 CAMPAIGN &gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
