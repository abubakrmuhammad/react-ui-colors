import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
      <div className='Pallete'>
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          // onAfterChange={this.changeLevel}
          onChange={this.changeLevel}
        />
        <div className='Pallete__colors'>{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
