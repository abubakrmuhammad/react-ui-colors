import React from 'react';
import Pallete from './components/Pallete';
import palletes from './seedColors';

function App() {
  return (
    <div className='App'>
      <Pallete {...palletes[1]} />
    </div>
  );
}

export default App;
