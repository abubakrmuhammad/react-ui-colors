import React from 'react';
import { chooseRandomFrom } from '../utils/misc';

function Overlay({ backgroundColor, visible, title, palette }) {
  let color = backgroundColor;

  if (!backgroundColor) color = chooseRandomFrom(palette).hex;

  return (
    <div className={`Overlay ${visible && 'visible'}`}>
      <div style={{ backgroundColor: color }} className='Overlay__backdrop ' />
      <div className='Overlay__message'>
        <h1>{title}</h1>
        {backgroundColor && <p>{backgroundColor}</p>}
      </div>
    </div>
  );
}

Overlay.defaultProps = {
  visible: false,
  title: 'Copied!'
};

export default Overlay;
