import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './css/Pallete.scss';

class Pallete extends Component {
  render() {
    const colorBoxes = this.props.colors.map(color => <ColorBox {...color} />);

    return (
      <div className='Pallete'>
        <div className='Pallete__colors'>{colorBoxes}</div>
      </div>
    );
  }
}

export default Pallete;
