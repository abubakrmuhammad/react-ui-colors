import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Overlay from './Overlay';
import { chooseRandomFrom } from '../utils/misc';

class ColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorFormat: 'hex',
      overlay: {
        visible: false,
        title: 'Copied!',
        color: chooseRandomFrom(props.palette.colors[500]).hex,
        style: {}
      }
    };
    this._shades = this.getShades(props.palette, props.colorId);

    this.changeFormat = this.changeFormat.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
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

    this.setState({ colorFormat }, () =>
      this.showOverlay({
        title: 'Color Format Changed!',
        color: this.state.overlay.color,
        style: { fontSize: '60%' }
      })
    );
  }

  showOverlay({ title, color, ...props }) {
    const overlay = {
      ...this.state.overlay,
      visible: true,
      title,
      color,
      ...props
    };

    this.setState({ overlay }, () => {
      setTimeout(() => {
        const overlay = { ...this.state.overlay, visible: false, style: {} };
        this.setState({ overlay });
      }, 1500);
    });
  }

  render() {
    const { colorFormat, overlay } = this.state;
    const { paletteName, emoji, id: paletteId } = this.props.palette;

    const colorBoxes = this._shades.map(color => (
      <ColorBox
        showOverlay={this.showOverlay}
        key={color.name}
        name={color.name}
        color={color[colorFormat]}
      />
    ));

    return (
      <div className='ColorPalette Palette'>
        <Navbar format={colorFormat} changeFormat={this.changeFormat} />
        <main className='Palette__colors'>
          {colorBoxes}
          <div
            style={{ backgroundColor: '#222', cursor: 'default' }}
            className='ColorBox'
          >
            <Link
              to={`/palette/${paletteId}`}
              className='ColorBox__copy'
              style={{ opacity: '1', visibility: 'visible' }}
            >
              Go Back
            </Link>
          </div>
        </main>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
        <Overlay {...overlay} colorFormat={colorFormat} />
      </div>
    );
  }
}

export default ColorPalette;
