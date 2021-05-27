import React, { useState } from 'react';
import './style.css';

const Carousel = () => {
  const slide1 = 'images/bear.jpg';
  const slide2 = 'images/bird.jpg';
  const slide3 = 'images/cat.jpg';
  const slide4 = 'images/dog.jpg';
  const slide5 = 'images/manul.jpg';
  const images = [
    <img key={slide1} src={slide1} />,
    <img key={slide2} src={slide2} />,
    <img key={slide3} src={slide3} />,
    <img key={slide4} src={slide4} />,
    <img key={slide5} src={slide5} />,
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const prevImage = () => {
    setActiveIndex(current => {
      return (current === 0) ? current = (images.length - 1) : current - 1
    });
  };
  const nextImage = () => {
    setActiveIndex(current => {
      return (current === images.length - 1) ? 0 : current + 1
    });
  };
  const prevIndex = activeIndex === 0
    ? activeIndex + (images.length - 1)
    : activeIndex - 1;
  const nextIndex = activeIndex === (images.length - 1)
    ? activeIndex - (images.length - 1)
    : activeIndex + 1;
  const getActiveIndex = (element) => {
    setActiveIndex(element)
  };

  let isDown = false;
  let startOnX;
  let offset = 0;
  return (
    <div className="sliderBlock">
      <div
        className="sliderScreen"
        onMouseDown={(element) => {
          const sliderScreen = document.querySelector('.sliderScreen');
          isDown = true;
          startOnX = element.pageX - sliderScreen.offsetLeft;
        }}
        onMouseLeave={() => isDown = false}
        onMouseMove={(element) => {
          const sliderScreen = document.querySelector('.sliderScreen');
          if(!isDown) return;
          element.preventDefault();
          const x = element.pageX - sliderScreen.offsetLeft;
          offset = (x - startOnX) * 2;
          return offset
        }}
        onMouseUp={() => {
          isDown = false;
          if(offset >= 120) {
            prevImage();
          }
          if(offset <= -120) {
            nextImage();
          }
          offset = 0;
        }}
      >
        <div className="sliderImage sliderImagePrevious" key={prevIndex}>
          {images[prevIndex]}
        </div>
        <div className="sliderImage" key={activeIndex}>
          <button className="sliderButton sliderButtonLeft" onClick={prevImage}>
            <div className="previousIcon" />
          </button>
          <div>{images[activeIndex]}</div>
          <button className="sliderButton sliderButtonRight" onClick={nextImage}>
            <div className="nextIcon" />
          </button>
          <div className="buttonsKit">
            <button className="buttonInKit" onClick={() => getActiveIndex(0)} />
            <button className="buttonInKit" onClick={() => getActiveIndex(1)} />
            <button className="buttonInKit" onClick={() => getActiveIndex(2)} />
            <button className="buttonInKit" onClick={() => getActiveIndex(3)} />
            <button className="buttonInKit" onClick={() => getActiveIndex(4)} />
          </div>
        </div>
        <div className="sliderImage sliderImageNext" key={nextIndex}>
          {images[nextIndex]}
        </div>
      </div>
    </div>
  )
}

export default Carousel;
