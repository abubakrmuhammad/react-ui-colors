import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import bg from '../style/bg.svg';
import DeleteDialog from './DeleteDialog';

const styles = {
  root: {
    backgroundColor: '#3C40C6',
    minHeight: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: '33%',
    backgroundAttachment: 'fixed'
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

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      deletingPaletteId: null
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  openDialog(event, id) {
    event.stopPropagation();

    this.setState({ dialogOpen: true, deletingPaletteId: id });
  }

  closeDialog() {
    this.setState({ dialogOpen: false, deletingPaletteId: null });
  }

  deletePalette() {
    this.closeDialog();

    this.props.deletePalette(this.state.deletingPaletteId);
  }

  render() {
    const { classes, palettes } = this.props;
    const { dialogOpen } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React UI Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='popout' timeout={800}>
                <MiniPalette openDialog={this.openDialog} {...palette} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <DeleteDialog
          open={dialogOpen}
          handleClose={this.closeDialog}
          deletePalette={this.deletePalette}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
