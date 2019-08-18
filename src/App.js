import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './components/PaletteList';
import Palette from './components/Palette';
import ColorPalette from './components/ColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
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
      <Route exact path='/palette/new' render={() => <NewPaletteForm />} />
      <Route
        exact
        path='/palette/:id'
        render={({ match }) => (
          <Palette palette={findPalette(match.params.id)} />
        )}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={({ match }) => (
          <ColorPalette
            colorId={match.params.colorId}
            palette={findPalette(match.params.paletteId)}
          />
        )}
      />
    </Switch>
  );
}

export default App;
