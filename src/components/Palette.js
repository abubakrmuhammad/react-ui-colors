import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = { level: 500, colorFormat: 'hex' };

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(event) {
    const colorFormat = event.target.value;

    this.setState({ colorFormat });
  }

  render() {
    const { level, colorFormat } = this.state;
    const { colors } = this.props.palette;

    const colorBoxes = colors[level].map(color => (
      <ColorBox name={color.name} color={color[colorFormat]} />
    ));

    return (
      <section className='Pallete'>
        <Navbar
          level={level}
          format={colorFormat}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
        />
        <div className='Pallete__colors'>{colorBoxes}</div>
      </section>
    );
  }
}

export default Palette;
