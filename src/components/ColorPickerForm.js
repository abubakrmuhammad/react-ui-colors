import React, { Fragment, Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
        color => color.name.toLowerCase() !== name.toLowerCase()
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
      name: this.state.newColorName,
      color: this.state.currentColor
    };

    this.setState({ newColorName: '' });
    this.props.addNewColor(newColor);
  }

  render() {
    const { isPaletteFull } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <Fragment>
        <ChromePicker color={currentColor} onChange={this.changeCurrentColor} />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={newColorName}
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
      </Fragment>
    );
  }
}

export default ColorPickerForm;
