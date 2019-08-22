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
      stage: 'edit',
      newPaletteName: '',
      emoji: '🎨'
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveName = this.saveName.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.handleEmojiChange = this.handleEmojiChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniquePaletteName', name =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== name.trim().toLowerCase()
      )
    );
  }

  handleClickOpen() {
    this.setState({ stage: 'name' });
  }

  handleClose() {
    this.setState({ stage: 'edit' });
  }

  saveName() {
    this.setState({ stage: 'emoji' });
  }

  savePalette() {
    const newPalette = {
      paletteName: this.state.newPaletteName.trim(),
      emoji: this.state.emoji
    };

    this.setState({ stage: 'saved' });
    this.props.savePalette(newPalette);
  }

  handleEmojiChange(emoji) {
    this.setState({ emoji: emoji.native });
  }

  render() {
    const { stage, newPaletteName, emoji } = this.state;

    const nameFormOpen = stage === 'name';
    const emojiFormOpen = stage === 'emoji';

    return (
      <Fragment>
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleClickOpen}
        >
          Save Palette
        </Button>

        <Dialog open={emojiFormOpen} onClose={this.handleClose}>
          <DialogTitle id='form-dialog-title'>
            Pick a palette emoji:{' '}
            <Twemoji noWrapper options={{ className: 'emoji' }}>
              <span>{emoji}</span>
            </Twemoji>
          </DialogTitle>
          <Picker
            autoFocus
            title='Skin Tone &rarr;'
            set='twitter'
            onSelect={this.handleEmojiChange}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={this.savePalette}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={nameFormOpen} onClose={this.handleClose}>
          <DialogTitle id='form-dialog-title'>
            Choose a Palette Name{' '}
            <Twemoji noWrapper options={{ className: 'emoji' }}>
              <span>{'🎨'}</span>
            </Twemoji>
          </DialogTitle>

          <ValidatorForm onSubmit={this.saveName}>
            <DialogContent style={{ paddingTop: '0', paddingBottom: '24px' }}>
              <DialogContentText>
                Please give your beautiful new palette a good name. Make sure
                it's not already been used.
              </DialogContentText>

              <TextValidator
                fullWidth
                autoFocus
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
                Done
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </Fragment>
    );
  }
}

export default PaletteMetaForm;
