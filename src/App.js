import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './components/PaletteList';
import Palette from './components/Palette';
import ColorPalette from './components/ColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
import palettes from './palettes';
import { generatePalette } from './utils/colors';

class App extends Component {
  constructor(props) {
    super(props);

    const savedPalettes = JSON.parse(localStorage.getItem('palettes'));

    this.state = {
      palettes: savedPalettes || palettes
    };

    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  savePalettesLocally() {
    const stringPalettes = JSON.stringify(this.state.palettes);

    localStorage.setItem('palettes', stringPalettes);
  }

  findPalette(id) {
    return generatePalette(
      this.state.palettes.find(palette => palette.id === id)
    );
  }

  savePalette(palette) {
    const palettes = [...this.state.palettes, palette];

    this.setState({ palettes }, this.savePalettesLocally);
  }

  deletePalette(id) {
    const palettes = this.state.palettes.filter(palette => palette.id !== id);

    this.setState({ palettes }, this.savePalettesLocally);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <PaletteList
              deletePalette={this.deletePalette}
              palettes={this.state.palettes}
            />
          )}
        />
        <Route
          exact
          path='/palette/new'
          render={routeProps => (
            <NewPaletteForm
              palettes={this.state.palettes}
              savePalette={this.savePalette}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path='/palette/:id'
          render={({ match }) => (
            <Palette palette={this.findPalette(match.params.id)} />
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={({ match }) => (
            <ColorPalette
              colorId={match.params.colorId}
              palette={this.findPalette(match.params.paletteId)}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
