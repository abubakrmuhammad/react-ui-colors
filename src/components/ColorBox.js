import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

function ColorBox({ name, color, moreUrl, showOverlay }) {
  const luminance = chroma(color).luminance();
  const isLightColor = luminance >= 0.8;

  return (
    <CopyToClipboard
      text={color}
      onCopy={() => showOverlay({ title: 'Copied!', color })}
    >
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
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
