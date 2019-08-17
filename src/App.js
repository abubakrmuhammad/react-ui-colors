import React from 'react';
import Pallete from './components/Pallete';
import palletes from './seedColors';
import s from './utils';

console.log(s(palletes[1]));

function App() {
  return (
    <div className='App'>
      <Pallete {...palletes[1]} />
    </div>
  );
}

export default App;
