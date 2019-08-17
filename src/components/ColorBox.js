import React, { Component } from 'react';

class ColorBox extends Component {
  render() {
    const { name, color } = this.props;

    return (
      <div style={{ backgroundColor: color }} className='ColorBox'>
        <button className='ColorBox__copy'>Copy</button>
        <p className='ColorBox__name'>{name}</p>
        <button className='ColorBox__more'>More</button>
      </div>
    );
  }
}

export default ColorBox;
