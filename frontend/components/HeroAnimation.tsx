import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../public/vet-hero-animation.json';

const HeroAnimation = () => (
  <Lottie 
    animationData={animationData}
    loop
    style={{ width: '320px', height: '320px', margin: '0 auto' }}
    aria-label="Veterinario animación"
  />
);

export default HeroAnimation;
