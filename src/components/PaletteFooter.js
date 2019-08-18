import React from 'react';

function PaletteFooter({ paletteName, emoji }) {
  return (
    <footer className='Palette__footer'>
      {paletteName} <span className='emoji'>{emoji}</span>
    </footer>
  );
}

export default PaletteFooter;
