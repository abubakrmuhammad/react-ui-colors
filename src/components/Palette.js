import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = { level: 500 };

    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  render() {
    const { level } = this.state;
    const { colors } = this.props.palette;

    const colorBoxes = colors[level].map(color => (
      <ColorBox name={color.name} color={color.hex} />
    ));

    return (
      <section className='Pallete'>
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className='Pallete__colors'>{colorBoxes}</div>
      </section>
    );
  }
}

export default Palette;
