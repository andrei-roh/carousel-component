import React from 'react';
import Carousel from './Carousel/Carousel';
import slides from './defaultSlides.js';

const App = () => {
  return (
    <div>
      <Carousel
        slides={slides}
        slideLength={390}
        slideHeight={260}
      />
    </div>
  )
};

export default App;
