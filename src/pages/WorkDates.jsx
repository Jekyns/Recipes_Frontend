import ClipLoader from 'react-spinners/ClipLoader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';

import Helpers from '../api/hs';
import config from '../config';


export default class WorkDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workDays: 0,
      loading: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const url = new URL(`${config.apiUrl}/test`);
    const params = { dates: `${event.target.elements['date_start'].value}|${event.target.elements['date_end'].value}` };
    url.search = new URLSearchParams(params);
    Helpers.httpRequest(
      url,
      'GET',
    )
      .then((response) => {
        this.setState({
          workDays: response.workdays,
          loading: false,
        });
        this.handleSubmit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showWordDays = () => {
    if (this.state.loading) {
      return (
        <ClipLoader
          sizeUnit={"px"}
          size={30}
          color={'#123abc'}
          loading={this.state.loading}
        />
      );
    }
    return (<div className="WorkDays">{this.state.workDays}</div>)
  }

  render() {
    return (
      <div className="body">
        <div className="body__dates">
          <form className="Update__form" onSubmit={this.handleSubmit}>
            <div className="dates__input">
              <TextField
                className="dates__input"
                id="date_start"
                label="Start"
                type="date"
                defaultValue="2019-01-03"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="dates__input input-direction">
              —
            </div>
            <div className="dates__input">
              <TextField
                className="dates__input"
                id="date_end"
                label="End"
                type="date"
                defaultValue="2019-01-13"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="dates__input">
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
            </div>
          </form>
          {this.showWordDays()}
        </div>
      </div>
    );
  }
}
