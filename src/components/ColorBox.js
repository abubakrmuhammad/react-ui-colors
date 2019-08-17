import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Overlay from './Overlay';

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { copied } = this.state;
    const { name, color } = this.props;

    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div style={{ backgroundColor: color }} className='ColorBox'>
          <button className='ColorBox__copy'>Copy</button>
          <p className='ColorBox__name'>{name}</p>
          <button className='ColorBox__more'>More</button>

          <Overlay backgroundColor={color} visible={copied} />
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
