import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Navbar({ level, changeLevel }) {
  return (
    <header className='Navbar'>
      <div className='Navbar__logo'>
        <a href='/'>reactuicolors</a>
      </div>
      <div className='Navbar__slider'>
        <span className='Navbar__level'>
          Level: <b>{level}</b>
        </span>
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onChange={changeLevel}
        />
      </div>
    </header>
  );
}

export default Navbar;
