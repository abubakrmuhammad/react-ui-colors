import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 350;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  }
});

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, open, savePalette, handleDrawerOpen } = this.props;

    return (
      <Fragment>
        <CssBaseline />

        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar
            disableGutters={!open}
            style={{ paddingRight: open ? '' : '24px' }}
          >
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddIcon />
            </IconButton>

            <Typography
              style={{ marginRight: 'auto' }}
              variant='h6'
              color='inherit'
              noWrap
            >
              Create a Palette
            </Typography>

            <Link
              to='/'
              style={{ marginRight: '12px', textDecoration: 'none' }}
            >
              <Button variant='contained' color='secondary' type='submit'>
                Go Back
              </Button>
            </Link>

            <PaletteMetaForm
              palettes={this.props.palettes}
              savePalette={savePalette}
            />
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
