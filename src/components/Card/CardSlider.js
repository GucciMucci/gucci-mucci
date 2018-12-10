import React, { Component } from "react";
import Slider from "react-slick";
import _ from "../utils";
import prev from "./prev.svg";
import next from "./next.svg";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return <img src={next} className={className + " next-arrow"} onClick={onClick} />;
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return <img src={prev} className={className + " prev-arrow"} onClick={onClick} />;
}

export default class CardSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      dots: false
    };
    return (
      <div className="slider">
        <Slider {...settings}>
          {this.props.images.map(image => {
            return <img src={_.white(image.image)} alt="" />;
          })}
        </Slider>
      </div>
    );
  }
}
