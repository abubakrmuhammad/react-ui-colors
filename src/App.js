import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './components/PaletteList';
import Palette from './components/Palette';
import palettes from './palettes';
import { findPalette } from './utils/colors';

function App() {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => <PaletteList palettes={palettes} />}
      />
      <Route
        exact
        path='/palette/:id'
        render={({ match }) => (
          <Palette palette={findPalette(match.params.id)} />
        )}
      />
    </Switch>
  );
}

export default App;
