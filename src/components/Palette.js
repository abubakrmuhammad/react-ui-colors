import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Overlay from './Overlay';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = { level: 500, colorFormat: 'hex', showOverlay: false };

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(event) {
    const colorFormat = event.target.value;

    this.setState({ colorFormat, showOverlay: true }, () => {
      setTimeout(() => this.setState({ showOverlay: false }), 1500);
    });
  }

  render() {
    const { level, colorFormat, showOverlay } = this.state;
    const { colors, paletteName, emoji, id } = this.props.palette;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
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
        <Overlay
          visible={showOverlay}
          title={`Color Format Changed!`}
          palette={colors[500]}
          style={{ fontSize: '60%' }}
        />
        <main className='Palette__colors'>{colorBoxes}</main>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Palette;
