import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Overlay from './Overlay';

class ColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = { colorFormat: 'hex', showOverlay: false };
    this._shades = this.getShades(props.palette, props.colorId);

    this.changeFormat = this.changeFormat.bind(this);
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

  changeFormat(event) {
    const colorFormat = event.target.value;

    this.setState({ colorFormat, showOverlay: true }, () => {
      setTimeout(() => this.setState({ showOverlay: false }), 1500);
    });
  }

  render() {
    const { colorFormat, showOverlay } = this.state;
    const { paletteName, emoji } = this.props.palette;

    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.name} name={color.name} color={color[colorFormat]} />
    ));

    return (
      <div className='Palette'>
        <Navbar format={colorFormat} changeFormat={this.changeFormat} />
        <section className='Palette__colors'>{colorBoxes}</section>
        <Overlay
          visible={showOverlay}
          title={`Color Format Changed!`}
          palette={[this._shades[4]]}
          style={{ fontSize: '60%' }}
        />
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default ColorPalette;
