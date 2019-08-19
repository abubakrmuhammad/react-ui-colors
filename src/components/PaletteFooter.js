import React from 'react';
import Twemoji from 'react-twemoji';

function PaletteFooter({ paletteName, emoji }) {
  return (
    <footer className='Palette__footer'>
      {paletteName} <Twemoji options={{ className: 'emoji' }}>{emoji}</Twemoji>
    </footer>
  );
}

export default PaletteFooter;
