import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '0.5rem 0.6rem 0',
    overflow: 'hidden',
    cursor: 'pointer',
    height: '200px'
  },
  colors: {
    backgroundColor: '#ccc',
    height: '80%',
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  miniColor: {
    height: '25%',
    width: '20%'
  },
  title: {
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#333'
  },
  emoji: {
    fontSize: '1.1rem'
  }
};

function MiniPalette({ classes, paletteName, emoji, colors }) {
  return (
    <figure className={classes.root}>
      <div className={classes.colors}>
        {colors.map(color => (
          <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}
          />
        ))}
      </div>
      <figcaption className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </figcaption>
    </figure>
  );
}

export default withStyles(styles)(MiniPalette);
