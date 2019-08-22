import React from 'react';

function Overlay({ color, colorFormat, visible, title, style }) {
  const styles = {
    backgroundColor: colorFormat === 'hexNot' ? `#${color}` : color
  };

  return (
    <div style={style} className={`Overlay ${visible && 'visible'}`}>
      <div style={styles} className='Overlay__backdrop ' />
      <div className='Overlay__message'>
        <h1>{title}</h1>
        {title === 'Copied!' && <p>{color}</p>}
      </div>
    </div>
  );
}

export default Overlay;
