import React from 'react';
import Palette from './components/Palette';
import palettes from './seedColors';
import { generatePalette } from './utils/colors';

function App() {
  return (
    <div className='App'>
      <Palette palette={generatePalette(palettes[1])} />
    </div>
  );
}

export default App;
