import React, { Component } from "react";
import Slider from "react-slick";
import _ from "../utils";
import prev from "./prev.svg";
import next from "./next.svg";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return <img src={next} className={className + " nextArrow"} onClick={onClick} />;
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return <img src={prev} className={className + " prevArrow"} onClick={onClick} />;
}

export default class MucciSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      dotsClass: "slick-dots mucci-dots"
    };
    return (
      <div className="slider">
        <Slider {...settings}>
          {this.props.images.map(image => {
            return <img src={_.highRes(image.image)} alt="" onClick={this.zoomIn} />;
          })}
        </Slider>
      </div>
    );
  }
}
