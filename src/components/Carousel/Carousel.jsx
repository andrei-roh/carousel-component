import React, { useState } from 'react';
import './style.css';

const Carousel = () => {
  const slide1 = 'images/bear.jpg';
  const slide2 = 'images/bird.jpg';
  const slide3 = 'images/cat.jpg';
  const slide4 = 'images/dog.jpg';
  const slide5 = 'images/manul.jpg';
  const img = [
    <img key={slide1} src={slide1} />,
    <img key={slide2} src={slide2} />,
    <img key={slide3} src={slide3} />,
    <img key={slide4} src={slide4} />,
    <img key={slide5} src={slide5} />,
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexDown = () => {
    activeIndex === 0
    ? setActiveIndex(activeIndex + 4)
    : setActiveIndex(activeIndex - 1);
  };
  const activeIndexUp = () => {
    activeIndex === (img.length - 1)
    ? setActiveIndex(activeIndex - 4)
    : setActiveIndex(activeIndex + 1);
  };

  return (
    <div className="sliderBlock">
      <button className="sliderButton" onClick={activeIndexDown}>Previous</button>
      <div className="slider">
        <div className="slider-img" key={activeIndex}>
          {img[activeIndex]}
        </div>
      </div>
      <button className="sliderButton" onClick={activeIndexUp}>Next</button>
    </div>
  )
}

export default Carousel;
