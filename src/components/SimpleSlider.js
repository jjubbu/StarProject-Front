import React, { Component } from "react";
import styled from "styled-components";
import Detail from "../pages/Detail";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SimpleSlider = () => {
  const settings = {
    dots: false, // 점 안보임
    infinite: true, // 무한넘김
    speed: 500,
    slidesToShow: 4, // 4장씩 보이게
    slidesToScroll: 1, //1장씩 넘어감
  };

  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
    </Slider>
  );
};

export default SimpleSlider;
