import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TransitionPage from './components/TransitionPage';
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={410}>
              <Switch location={location}>
                <Route
                  exact
                  path='/'
                  render={() => (
                    <TransitionPage>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        palettes={this.state.palettes}
                      />
                    </TransitionPage>
                  )}
                />
                <Route
                  exact
                  path='/palette/new'
                  render={routeProps => (
                    <TransitionPage>
                      <NewPaletteForm
                        palettes={this.state.palettes}
                        savePalette={this.savePalette}
                        {...routeProps}
                      />
                    </TransitionPage>
                  )}
                />
                <Route
                  exact
                  path='/palette/:id'
                  render={({ match }) => (
                    <TransitionPage>
                      <Palette palette={this.findPalette(match.params.id)} />
                    </TransitionPage>
                  )}
                />
                <Route
                  exact
                  path='/palette/:paletteId/:colorId'
                  render={({ match }) => (
                    <TransitionPage>
                      <ColorPalette
                        colorId={match.params.colorId}
                        palette={this.findPalette(match.params.paletteId)}
                      />
                    </TransitionPage>
                  )}
                />

                <Route render={() => <Redirect to='/' />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
