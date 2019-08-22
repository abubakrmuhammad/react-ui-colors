import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Overlay from './Overlay';
import { chooseRandomFrom } from '../utils/misc';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      colorFormat: 'hex',
      overlay: {
        visible: false,
        title: 'Copied!',
        color: chooseRandomFrom(props.palette.colors[500]).hex,
        style: {}
      }
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
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
    const { level, colorFormat, overlay } = this.state;
    const { colors, paletteName, emoji, id } = this.props.palette;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        showOverlay={this.showOverlay}
        key={color.id}
        name={color.name}
        color={color[colorFormat]}
        moreUrl={`/palette/${id}/${color.id}`}
      />
    ));

    return (
      <div className='Palette'>
        <Navbar
          level={level}
          format={colorFormat}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
        />
        <main className='Palette__colors'>{colorBoxes}</main>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
        <Overlay {...overlay} colorFormat={colorFormat} />
      </div>
    );
  }
}

export default Palette;
