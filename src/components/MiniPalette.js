import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '0.5rem',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  colors: {
    backgroundColor: '#ccc'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#333'
  },
  emoji: {
    fontSize: '1.2rem'
  }
};

function MiniPalette({ classes, paletteName, emoji, colors }) {
  return (
    <div className={classes.root}>
      <div className={classes.colors} />
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
