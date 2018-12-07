import React, { Component } from "react";
import Slider from "react-slick";
import _ from "../utils";

export default class MucciSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    return (
      <div className="slider">
        <Slider {...settings}>
          {this.props.images.map(image => {
            return <img src={_.highRes(image.image)} alt="" />;
          })}
        </Slider>
      </div>
    );
  }
}
