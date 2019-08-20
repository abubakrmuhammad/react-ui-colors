import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
          <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <ValidatorForm
              onSubmit={() => savePalette(this.state.newPaletteName)}
            >
              <TextValidator
                label='Palette Name'
                value={newPaletteName}
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
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default PaletteMetaForm;
