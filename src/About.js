// src/components/About.js
import './App.css';
import React from 'react';
import NavigationBar from './NavigationBar';


const About = () => {
  return (
    <div>
          <div>
      <header>
      <div><NavigationBar /></div>
    </header>
    <div id='about'>
      <h1>About the Pokédex</h1>
      <p>This is a Pokédex application built with React and React Router. Our group consists of 3 people: Ada, Marcin and Natalia.</p>
      <p> Pokémons are cool. </p>
    </div></div></div>
  );
};

export default About;