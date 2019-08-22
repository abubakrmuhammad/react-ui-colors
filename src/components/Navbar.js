import React from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Navbar({ level, format, changeLevel, changeFormat }) {
  return (
    <header className='Navbar'>
      <div className='Navbar__logo'>
        <Link to='/'>reactuicolors</Link>
      </div>
      {level && (
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
      )}
      <div className='Navbar__select'>
        <Select value={format} onChange={changeFormat}>
          <MenuItem value='hex'>HEX - (#DE4536)</MenuItem>
          <MenuItem value='hexNot'>HEX - (DE4536)</MenuItem>
          <MenuItem value='rgb'>RGB - (1, 2, 3)</MenuItem>
          <MenuItem value='rgba'>RGBA - (1, 2, 3, 0.4)</MenuItem>
          <MenuItem value='hsl'>HSL - (145, 65%, 47%)</MenuItem>
        </Select>
      </div>
    </header>
  );
}

export default Navbar;
