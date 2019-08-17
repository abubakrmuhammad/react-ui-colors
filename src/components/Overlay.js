import React from 'react';

function Overlay({ backgroundColor, visible, title }) {
  return (
    <div className='Overlay'>
      <div
        style={{ backgroundColor }}
        className={`Overlay__backdrop ${visible && 'visible'}`}
      />
      <div className={`Overlay__message ${visible && 'visible'}`}>
        <h1>{title}</h1>
        <p>{backgroundColor}</p>
      </div>
    </div>
  );
}

Overlay.defaultProps = {
  backgroundColor: '#e74c3c',
  visible: false,
  title: 'Copied!'
};

export default Overlay;
