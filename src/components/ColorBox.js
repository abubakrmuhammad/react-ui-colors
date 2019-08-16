import React, { Component } from 'react';
import './css/ColorBox.scss';

class ColorBox extends Component {
  render() {
    return (
      <div style={{ backgroundColor: this.props.color }} className='ColorBox'>
        <p>{this.props.name}</p>
        <button>More</button>
      </div>
    );
  }
}

export default ColorBox;
