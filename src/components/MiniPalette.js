import React from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import Twemoji from 'react-twemoji';

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
    height: '1.3rem',
    width: '1.3rem'
  }
};

function MiniPalette({ classes, id, paletteName, emoji, colors, history }) {
  return (
    <figure
      className={classes.root}
      onClick={() => history.push(`/palette/${id}`)}
    >
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
        {paletteName}{' '}
        <Twemoji options={{ className: classes.emoji }}>{emoji}</Twemoji>
      </figcaption>
    </figure>
  );
}

export default withStyles(styles)(withRouter(MiniPalette));
