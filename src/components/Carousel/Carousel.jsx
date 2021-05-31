import React, { useState } from 'react';
import './style.css';

const Carousel = ({ slides, slideLength, slideHeight }) => {
  const carouselEdge = Math.floor(slides.length / 2);
  let slidesPositions = [];
  if (slides % 2 === 0) {
  	for (let i = carouselEdge; i >= 0; i -= 1) {
      slidesPositions.push(slideLength * i)
    }
    for (let i = 1; i < carouselEdge; i += 1) {
      slidesPositions.push(-slideLength * i)
    }
  } else {
  	for (let i = carouselEdge; i > 0; i -= 1) {
      slidesPositions.push(slideLength * i)
    }
    slidesPositions.push(0)
    for (let i = 1; i < carouselEdge + 1; i += 1) {
      slidesPositions.push(-slideLength * i)
    }
  }
  const [activePosition, setActivePosition] = useState(0);
  const [activeDirection, setActiveDirection] = useState(0);
  const prevSlide = () => {
    setActivePosition(current => {
      return (
        (current / slideLength) === carouselEdge)
          ? current = (-slideLength * carouselEdge)
          : current + slideLength;
    });
  };
  const nextSlide = () => {
    setActivePosition(current => {
      return (
        (current / slideLength) === (-carouselEdge))
          ? current = (slideLength * carouselEdge)
          : current - slideLength;
    });
  };

  let isDown = false;
  let startOnX;
  let offset = 0;
  let scrollLeft;

  const setOnUpChangeSlide = () => {
    isDown = false;
    if (activePosition > slideLength) {
      if (activeDirection > 0) {
        return setActivePosition(slideLength * 2);
      };
      if (activeDirection < 0) {
        return setActivePosition(slideLength);
      };
    };
    if (activePosition >= 60 && activePosition <= slideLength) {
      if (activeDirection > 0) {
        return setActivePosition(slideLength);
      };
      if (activeDirection < 0) {
        return setActivePosition(0);
      };
    };
    if (activePosition <= -60 && activePosition >= -slideLength) {
      if (activeDirection < 0) {
        return setActivePosition(-slideLength);
      };
      if (activeDirection > 0) {
        return setActivePosition(0);
      };
    };
    if (activePosition < -slideLength) {
      if (activeDirection < 0) {
        return setActivePosition(-slideLength * 2);
      };
      if (activeDirection > 0) {
        return setActivePosition(-slideLength);
      };
    };
    return setActivePosition(0)
  }

  return (
    <div className="sliderBlock">
      <div
        className="sliderScreen"
        style={{ width: `${slideLength}px`}}
      >
        <button
          className="sliderButton sliderButtonLeft"
          style={{ minHeight: `${slideHeight}px`}}
          onClick={prevSlide}
        >
          <div className="previousIcon" />
        </button>
        {slides.map(
          slide =>
            <img
              className="sliderSlide"
              style={{ left: `${activePosition}px`, height: `${slideHeight}px` }}
              key={slide.key}
              src={slide.src}
              onMouseDown={(element) => {
                element.preventDefault();
                const sliderScreen = document.querySelector('.sliderSlide');
                isDown = true;
                startOnX = element.pageX - sliderScreen.offsetLeft;
                scrollLeft = sliderScreen.scrollLeft;
              }}
              onMouseLeave={
                () => {
                  isDown = false
                }
              }
              onMouseMove={(element) => {
                const sliderScreen = document.querySelector('.sliderSlide');
                if(!isDown) return;
                element.preventDefault();
                const x = element.pageX - sliderScreen.offsetLeft;
                offset = (x - startOnX) * 2;
                sliderScreen.scrollLeft = scrollLeft - offset;
                offset > 0 ? setActiveDirection(1) : setActiveDirection(-1);
                setActivePosition(activePosition + (offset * 30))
              }}
              onMouseUp={setOnUpChangeSlide}
              onTouchStart={(element) => {
                const sliderScreen = document.querySelector('.sliderSlide');
                isDown = true;
                startOnX = element.touches[0].pageX - sliderScreen.offsetLeft;
                scrollLeft = sliderScreen.changedTouches;
              }}
              onTouchMove={(element) => {
                const sliderScreen = document.querySelector('.sliderSlide');
                if(!isDown) return;
                const x = element.touches[0].pageX - sliderScreen.offsetLeft;
                offset = (x - startOnX);
                sliderScreen.changedTouches = scrollLeft - offset;
                offset > 0 ? setActiveDirection(1) : setActiveDirection(-1);
                setActivePosition(activePosition + (offset * 30))
              }}
              onTouchEnd={setOnUpChangeSlide}
            />
        )}
        <button
          className="sliderButton sliderButtonRight"
          style={{ minHeight: `${slideHeight}px`}}
          onClick={nextSlide}
        >
          <div className="nextIcon" />
        </button>
        <div className="buttonsKit">
          {slides.map(
            slide =>
              <button
                key={slide.key}
                className="buttonInKit"
                style={{ opacity: `${slidesPositions[slides.indexOf(slide)] === activePosition ? 1 : 0.3}` }}
                onClick={() => setActivePosition(slidesPositions[slides.indexOf(slide)])}
              />
          )}
        </div>
      </div>
    </div>
  )
}

export default Carousel;
