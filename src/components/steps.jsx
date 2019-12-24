import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let counterId = 0;
export default class StepsInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // setOpen: false
      count: 1,
      steps: [
        {
          id: 0,
          value: '',
          image: '',
          key: 0,
        },
      ],
      require: true,
      last_step: 'step 0',
    };
  }

  componentDidMount = () => {
    if (this.props.steps) {
      const newsteps = [];
      for (let stepId in this.props.steps) {
        let step = {};
        step.key = ++counterId;
        step.id = counterId;
        step.value = this.props.steps[stepId].text;
        step.image = this.props.steps[stepId].image;
        newsteps.push(step);
      }
      const emptyStep = {};
      emptyStep.key = counterId + 1;
      counterId += 1;
      emptyStep.id = counterId;
      emptyStep.value = '';
      newsteps.push(emptyStep);
      this.setState({ steps: newsteps });
    }
  }

  addStep = () => {
    const emptyStep = {};
    emptyStep.key = counterId + 1;
    counterId += 1;
    emptyStep.id = counterId;
    emptyStep.value = '';
    this.setState(prevState => ({
      ...prevState,
      steps: [...prevState.steps, emptyStep]
    }));
  }

  deleteStep = (item) => {
    const itemId = item.id.split(' ')[1];
    const stepList = [...this.state.steps]
    for (let stepId in stepList) {
      if (stepList[stepId].id === itemId) {
        stepList.splice(+stepId, 1);
        this.setState({ steps: stepList })
        break;
      }
    }
  }

  BlurController = (event) => {
    if (event.currentTarget.value.length > 0) {
      if (+event.currentTarget.id.split(' ')[1] === this.state.steps[this.state.steps.length - 1].id) {
        return this.addStep(event.currentTarget);
      }
    } else {
      if (+event.currentTarget.id.split(' ')[1] !== this.state.steps[this.state.steps.length - 1].id) {
        return this.deleteStep(event.currentTarget);
      }
      return null;
    }
    return null;
  }

  handleUploadImageStep = (event) => {
    const id = event.currentTarget.id.split(' ')[1];
    this.state.steps[id].image = event.currentTarget.files[0].name;
    this.setState({ id: 2 });
    const file = {
      file: event.currentTarget.files[0],
      id,
    };
    this.props.onUploadStepImage(
      file,
    );
  }

  showImages = (id) => {
    return (
      <div className="create__uploadedImage">
        {this.state.steps[id].image}
      </div>
    );
  }

  onChangeInput = (e, step) => {
    const newStep = { ...step };
    newStep.value = e.currentTarget.value;
    const newSteps = [...this.state.steps].map(item => item.id === step.id ? newStep : item);
    this.setState({ steps: [...newSteps] });
  }

  steps = () => {
    return (
      <div>
        {this.state.steps.map((step, index) => {
          return (
            <div className="create__step">
              <div className="create__input">
                <TextField
                  required={index === 0 ? true : false}
                  value={step.value}
                  margin="dense"
                  id={`step ${+step.id}`}
                  label={`Step ${+index + 1}`}
                  type="text"
                  onBlur={this.BlurController}
                  onFocus={this.FocusController}
                  onChange={(e) => { this.onChangeInput(e, step); }}
                  multiline
                  rows="2"
                  variant="outlined"
                  // autoFocus={this.state.autofocus}
                  // fullWidth
                  style={{ width: 500 }}
                />
              </div>
              <div className="create__image">
                <input
                  id={`stepimage ${+index}`}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={this.handleUploadImageStep}
                />
                <label htmlFor={`stepimage ${+index}`}>
                  <Button variant="raised" component="span">
                    Upload image for Step
                  </Button>
                </label>
                {this.showImages(index)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    // const [open, setOpen] = React.useState(false);
    return (
      <div>
        {this.steps()}
      </div>
    );
  }
}
StepsInputs.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUploadStepImage: PropTypes.func.isRequired,
};
