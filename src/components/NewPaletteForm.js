import React, { Component } from 'react';
import classNames from 'classnames';
import slugify from 'slugify';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerFrom from './ColorPickerForm';
import { arrayMove } from 'react-sortable-hoc';
import { chooseRandomFrom } from '../utils/misc';
import palettes from '../palettes';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawerButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '85%'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: palettes[0].colors
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.sortEndHandler = this.sortEndHandler.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  addNewColor(newColor) {
    const colors = [...this.state.colors, newColor];

    this.setState({ colors });
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();
    const colors = [...this.state.colors, chooseRandomFrom(allColors)];

    this.setState({ colors });
  }

  removeColor(colorName) {
    const colors = this.state.colors.filter(color => color.name !== colorName);

    this.setState({ colors });
  }

  clearPalette() {
    this.setState({ colors: [] });
  }

  savePalette({ paletteName, emoji }) {
    const id = slugify(paletteName, { lower: true });
    const { colors } = this.state;

    const newPalette = { paletteName, emoji, id, colors };

    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  sortEndHandler({ oldIndex, newIndex }) {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          palettes={palettes}
          open={open}
          savePalette={this.savePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          <div className={classes.drawerContent}>
            <Typography style={{ margin: '2rem auto' }} variant='h4'>
              Design Your Palette
            </Typography>
            <div className={classes.drawerButtons}>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.clearPalette}
              >
                Clear Palette
              </Button>

              <Button
                variant='contained'
                color='primary'
                onClick={this.addRandomColor}
                disabled={isPaletteFull}
              >
                Random Color
              </Button>
            </div>

            <ColorPickerFrom
              colors={colors}
              isPaletteFull={isPaletteFull}
              addNewColor={this.addNewColor}
            />
          </div>
        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.sortEndHandler}
            distance={10}
          />
          {colors.length === 0 && 'Add More Colors...'}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
