import React, { Fragment, Component } from 'react';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
  form: {
    width: '85%',
    margin: '2rem auto'
  },
  picker: {
    width: '100% !important'
  },
  colorNameInput: {
    width: '100%',
    margin: '1.4rem auto'
  },
  addColorButton: {
    width: '100%',
    margin: '0 auto',
    padding: '1rem',
    fontFamily: 'Barlow',
    fontWeight: '600',
    fontSize: '1.7rem',
    transition: 'none'
  }
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: '#10ac84',
      newColorName: ''
    };

    this.changeCurrentColor = this.changeCurrentColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniqueColorName', name =>
      this.props.colors.every(
        color => color.name.toLowerCase() !== name.trim().toLowerCase()
      )
    );

    ValidatorForm.addValidationRule('isUniqueColor', () =>
      this.props.colors.every(color => color.color !== this.state.currentColor)
    );
  }

  changeCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }

  handleSubmit() {
    const newColor = {
      name: this.state.newColorName.trim(),
      color: this.state.currentColor
    };

    this.setState({ newColorName: '' });
    this.props.addNewColor(newColor);
  }

  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    const luminance = chroma(currentColor).luminance();
    const isLightColor = luminance >= 0.8;

    return (
      <Fragment>
        <ValidatorForm
          className={classes.form}
          onSubmit={this.handleSubmit}
          instantValidate={false}
        >
          <ChromePicker
            className={classes.picker}
            color={currentColor}
            onChange={this.changeCurrentColor}
            disableAlpha
          />
          <TextValidator
            className={classes.colorNameInput}
            value={newColorName}
            variant='filled'
            label='Color Name'
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
            className={`${classes.addColorButton} ${isLightColor &&
              'dark-text'}`}
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
