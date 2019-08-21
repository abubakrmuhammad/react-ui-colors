import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';

const styles = {
  root: {
    backgroundColor: '#34495e',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1024px',
    margin: '0 auto'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100px',
    '& h1': {
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: '1.9rem',
      letterSpacing: '1px'
    },
    '& a': {
      color: '#fff'
    }
  },
  palettes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '40px 5%'
  }
};

function PaletteList({ classes, palettes }) {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React UI Colors</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>

        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette key={palette.id} {...palette} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
