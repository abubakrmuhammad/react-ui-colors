import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
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
    const { name, color, moreUrl } = this.props;

    const luminance = chroma(color).luminance();
    const isLightColor = luminance >= 0.8;

    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div
          style={{ backgroundColor: color }}
          className={`ColorBox ${isLightColor && 'dark-text'}`}
        >
          <button className='ColorBox__copy'>Copy</button>
          <p className='ColorBox__name'>{name}</p>
          {moreUrl && (
            <Link
              className='ColorBox__more'
              to={moreUrl}
              onClick={e => e.stopPropagation()}
            >
              More
            </Link>
          )}

          <Overlay backgroundColor={color} visible={copied} />
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
