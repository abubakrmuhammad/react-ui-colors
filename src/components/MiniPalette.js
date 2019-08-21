import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';
import Twemoji from 'react-twemoji';

const styles = {
  root: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '0.5rem 0.6rem 0',
    overflow: 'hidden',
    cursor: 'pointer',
    height: '200px',
    '&:hover .deleteIcon': {
      visibility: 'visible',
      opacity: 1
    }
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
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '8px 12px',
    zIndex: '10',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s'
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

class MiniPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deletePalette = this.deletePalette.bind(this);
  }

  deletePalette(event) {
    event.stopPropagation();

    this.props.deletePalette(this.props.id);
  }

  render() {
    const { classes, id, paletteName, emoji, colors, history } = this.props;
    return (
      <figure
        className={classes.root}
        onClick={() => history.push(`/palette/${id}`)}
      >
        <div
          className={`${classes.deleteIcon} deleteIcon`}
          onClick={this.deletePalette}
        >
          <DeleteIcon />
        </div>
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
}

export default withStyles(styles)(withRouter(MiniPalette));
