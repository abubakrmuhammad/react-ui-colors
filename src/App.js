import React from 'react';
import Palette from './components/Palette';
import { Route, Switch } from 'react-router-dom';
import palettes from './seedColors';
import { generatePalette } from './utils/colors';

function App() {
  return (
    <Switch>
      <Route exact path='/' render={() => <h1>Palette List</h1>} />
      <Route
        exact
        path='/palette/:id'
        render={() => <Palette palette={generatePalette(palettes[1])} />}
      />
    </Switch>
  );
}

export default App;
