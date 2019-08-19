import React from 'react';
import classNames from 'classnames';
import slugify from 'slugify';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import { chooseRandomFrom } from '../utils/misc';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex'
  },
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
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
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

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20
  };

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      newPaletteName: '',
      newColorName: '',
      currentColor: '#10ac84',
      colors: props.palettes[0].colors
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.changeCurrentColor = this.changeCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.sortEndHandler = this.sortEndHandler.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniqueColorName', name =>
      this.state.colors.every(
        color => color.name.toLowerCase() !== name.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule('isUniqueColor', () =>
      this.state.colors.every(color => color.color !== this.state.currentColor)
    );

    ValidatorForm.addValidationRule('isUniquePaletteName', name =>
      this.props.palettes.every(
        palette => palette.paletteName.toLowerCase() !== name.toLowerCase()
      )
    );
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  changeCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }

  addNewColor() {
    const newColor = {
      name: this.state.newColorName,
      color: this.state.currentColor
    };

    this.setState(state => ({
      colors: [...state.colors, newColor],
      newColorName: ''
    }));
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

  savePalette() {
    const paletteName = this.state.newPaletteName;
    const id = slugify(paletteName, { lower: true });

    const newPalette = {
      paletteName,
      id,
      colors: this.state.colors
    };

    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  sortEndHandler({ oldIndex, newIndex }) {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  }

  render() {
    const { classes, maxColors } = this.props;
    const { open, currentColor, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create Palette
            </Typography>
            <ValidatorForm onSubmit={this.savePalette}>
              <TextValidator
                label='Palette Name'
                value={this.state.newPaletteName}
                validators={['required', 'isUniquePaletteName']}
                errorMessages={['Enter a Palette Name', 'Name Already Used']}
                onChange={e =>
                  this.setState({ newPaletteName: e.target.value })
                }
              />
              <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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

          <Typography variant='h4'>Design Your Palette</Typography>
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
          <ChromePicker
            color={currentColor}
            onChange={this.changeCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newColorName}
              onChange={e => this.setState({ newColorName: e.target.value })}
              validators={['required', 'isUniqueColorName', 'isUniqueColor']}
              errorMessages={[
                'Enter a Color Name',
                'Color name must be Unique',
                'Color already Added'
              ]}
            />
            <Button
              variant='contained'
              color='primary'
              style={
                isPaletteFull
                  ? {}
                  : {
                      backgroundColor: currentColor
                    }
              }
              type='submit'
              disabled={isPaletteFull}
            >
              {isPaletteFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
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
          />
          {colors.length === 0 && 'Add More Colors...'}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
