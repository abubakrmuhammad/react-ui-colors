import React from 'react';
import './App.css';
import Pallete from './components/Pallete';
import palletes from './seedColors';

function App() {
  return (
    <div className='App'>
      <Pallete {...palletes[2]} />
    </div>
  );
}

export default App;
