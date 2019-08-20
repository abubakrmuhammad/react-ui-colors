import React, { Fragment, Component } from 'react';
import Twemoji from 'react-twemoji';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      newPaletteName: ''
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniquePaletteName', name =>
      this.props.palettes.every(
        palette => palette.paletteName.toLowerCase() !== name.toLowerCase()
      )
    );
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { savePalette } = this.props;
    const { open, newPaletteName } = this.state;

    return (
      <Fragment>
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleClickOpen}
        >
          Save Palette
        </Button>

        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle id='form-dialog-title'>
            Choose a Palette Name{' '}
            <Twemoji noWrapper options={{ className: 'emoji' }}>
              <span>{'🎨'}</span>
            </Twemoji>
          </DialogTitle>
          <Picker set='twitter' />

          <ValidatorForm
            onSubmit={() => savePalette(this.state.newPaletteName)}
          >
            <DialogContent style={{ paddingTop: '0', paddingBottom: '24px' }}>
              <DialogContentText>
                Please give your beautiful new palette a good name. Make sure
                it's not already been used.
              </DialogContentText>

              <TextValidator
                fullWidth
                margin='normal'
                label='Palette Name'
                value={newPaletteName}
                validators={['required', 'isUniquePaletteName']}
                errorMessages={['Enter a Palette Name', 'Name Already Used']}
                onChange={e =>
                  this.setState({ newPaletteName: e.target.value })
                }
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </Fragment>
    );
  }
}

export default PaletteMetaForm;
