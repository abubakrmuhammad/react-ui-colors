import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Navbar({ level, format, changeLevel, changeFormat }) {
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
      <div className='Navbar__select'>
        <Select value={format} onChange={changeFormat}>
          <MenuItem value='hex'>Hex (#aa1923)</MenuItem>
          <MenuItem value='rgb'>rgb - (1, 2, 3)</MenuItem>
          <MenuItem value='rgba'>rgba - (1, 2, 3, 0.4)</MenuItem>
        </Select>
      </div>
    </header>
  );
}

export default Navbar;
