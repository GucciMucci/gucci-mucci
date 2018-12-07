import React, { Component } from "react";
import Slider from "react-slick";

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
      <div className="">
        <Slider {...settings}>
          {this.props.images.map(image => {
            return <img src={image.image} alt="" />;
          })}
        </Slider>
      </div>
    );
  }
}
