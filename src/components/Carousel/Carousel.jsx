import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Carousel = ({ children, show, infiniteLoop, indicators }) => {
    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
    const [slidesLength, setSlidesLength] = useState(children.length);

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show);
    const [isTransition, setIsTransition] = useState(true);

    const [touchPosition, setTouchPosition] = useState(null);
    const [paused, setPaused] = useState(true);

    const changeSlide = (direction, index) => {
        switch (direction) {
            case 'next':
                if (isRepeating || currentIndex < slidesLength - show)
                    setCurrentIndex((prevState) => prevState + 1);
                break;
            case 'previous':
                if (isRepeating || currentIndex > 0) setCurrentIndex((prevState) => prevState - 1);
                break;
            case 'index':
                setCurrentIndex(index + 1);
                break;
        }
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (!touchDown) return;

        const currentTouch = e.touches[0].clientX;
        const difference = touchDown - currentTouch;

        if (difference > 5) changeSlide('next');
        if (difference < -5) changeSlide('previous');

        setTouchPosition(null);
    };

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (!currentIndex) {
                setIsTransition(false);
                setCurrentIndex(slidesLength);
            } else if (currentIndex === slidesLength + show) {
                setIsTransition(false);
                setCurrentIndex(show);
            }
        }
    };

    const renderExtraPrev = () => {
        let output = [];
        for (let index = 0; index < show; index++) {
            output.push(children[slidesLength - 1 - index]);
        }
        output.reverse();
        return output;
    };

    const renderExtraNext = () => {
        let output = [];
        for (let index = 0; index < show; index++) {
            output.push(children[index]);
        }
        return output;
    };

    useEffect(() => {
        setSlidesLength(children.length);
        setIsRepeating(infiniteLoop && children.length > show);
    }, [children, infiniteLoop, show]);

    useEffect(() => {
        if (isRepeating && (currentIndex === show || currentIndex === slidesLength))
            setIsTransition(true);
    }, [currentIndex, isRepeating, show, slidesLength]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) changeSlide('next');
        }, 2000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <button className="left-arrow" onClick={() => changeSlide('previous')}>
                    {(isRepeating || currentIndex > 0) && <img src="icons/right-arrow.svg" />}
                </button>

                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}>
                    <div
                        className={`carousel-content show-${show}`}
                        style={{
                            transform: `translateX(-${(currentIndex * 100) / show}%)`,
                            transition: !isTransition ? 'none' : undefined
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}>
                        {slidesLength > show && isRepeating && renderExtraPrev()}
                        {children}
                        {slidesLength > show && isRepeating && renderExtraNext()}
                    </div>
                </div>

                <button className="right-arrow" onClick={() => changeSlide('next')}>
                    {(isRepeating || currentIndex < slidesLength - show) && (
                        <img src="icons/right-arrow.svg" />
                    )}
                </button>
            </div>
            {indicators && (
                <div className="indicators">
                    {children.map((child, index) => {
                        return (
                            <button
                                className={`${index === currentIndex - 1 ? 'active' : ''}
                            `}
                                key={`${child}-${index}`}
                                onClick={() => changeSlide('index', index)}>
                                {index + 1}
                            </button>
                        );
                    })}
                    <button className="play-pause" onClick={() => setPaused(!paused)}>
                        <img src={paused ? 'icons/play.svg' : 'icons/pause.svg'} />
                    </button>
                </div>
            )}
        </div>
    );
};

Carousel.propTypes = {
    children: PropTypes.any
};

export default Carousel;
