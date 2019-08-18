import React, { Component } from 'react';
import ColorBox from './ColorBox';

class ColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this._shades = this.getShades(props.palette, props.colorId);
    console.log(this._shades);
  }

  getShades({ colors }, colorId) {
    const shades = [];

    for (const shade in colors) {
      if (colors.hasOwnProperty(shade)) {
        const shadeColors = colors[shade];

        shades.push(shadeColors.find(color => color.id === colorId));
      }
    }

    return shades;
  }

  render() {
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.name} name={color.name} color={color.hex} />
    ));
    return (
      <div className='Palette'>
        <h1>Color Palette</h1>
        <section className='Palette__colors'>{colorBoxes}</section>
      </div>
    );
  }
}

export default ColorPalette;
