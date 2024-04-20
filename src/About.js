// src/components/About.js

import React from 'react';
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
          <div>
      <header>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
    </header>
      <h1>About the Pokedex</h1>
      <p>This is a Pokedex application built with React and React Router.</p>
      <p> Pokemons are cool. </p>
    </div></div>
  );
};

export default About;