import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import IngredientsInputs from './ingredients';
import StepsInputs from './steps';

export default class CreateRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      stepsimages: [],
      submitText: 'Create',
    };
  }

  componentDidMount() {
    // debugger
    if (this.props.title) {
      this.setState({ submitText: 'Edit' });
    }
  }

  handleSubmit = (event) => {
    this.props.onSubmit(event, this.state.files, this.state.stepsimages);
  }

  handleClose = () => {
    this.props.onBack(true);
  }

  handleUploadStepImage = (file) => {
    this.state.stepsimages[file.id] = file.file;
  }

  handleChange = (files) => {
    this.setState({
      files,
    });
  }

  render() {
    const {
      title,
      ingredients,
      difficult,
      duration,
      steps,
      calories,
    } = this.props;
    return (
      <form className="Recipe_creator__form" onSubmit={this.handleSubmit}>
        <DropzoneArea
          onChange={this.handleChange}
        />
        <TextField
          margin="dense"
          id="title"
          label="Title"
          type="text"
          defaultValue={title}
          required
          className="create__form-input"
        />
        <TextField
          margin="dense"
          id="calories"
          label="Calories"
          type="number"
          defaultValue={calories}
          className="create__form-input"
        />
        <TextField
          margin="dense"
          id="difficult"
          label="Difficult"
          type="number"
          defaultValue={difficult}
          className="create__form-input"
        />
        <TextField
          margin="dense"
          id="duration"
          label="Duration"
          type="number"
          defaultValue={duration}
          className="create__form-input"
        />
        <IngredientsInputs
          ingredients={ingredients}
        />
        <StepsInputs
          steps={steps}
          onUploadStepImage={this.handleUploadStepImage}
        />
        <Button onClick={this.handleClose} color="primary">
          Back to home
        </Button>

        <Button type="submit" color="primary">
          {this.state.submitText}
        </Button>
      </form>
    );
  }
}
CreateRecipeForm.propTypes = {
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficult: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  calories: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
