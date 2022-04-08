import React from 'react';
import Carousel from './Carousel/Carousel';

const App = () => {
    return (
        <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto', marginTop: 25 }}>
            <Carousel show={1} infiniteLoop={true} indicators={true}>
                <img src="images/bear.jpg" />
                <img src="images/bird.jpg" />
                <img src="images/cat.jpg" />
                <img src="images/dog.jpg" />
                <img src="images/frog.jpg" />
                <img src="images/horse.jpg" />
                <img src="images/manul.jpg" />
                <img src="images/pig.jpg" />
                <img src="images/rabbit.jpg" />
            </Carousel>
        </div>
    );
};

export default App;
