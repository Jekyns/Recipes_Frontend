import React from 'react';

export default class EditButton extends React.Component {
  showPage = ({ active, onEdit }) => {
    if (active) {
      return (
        <button type="button" onClick={() => { onEdit(true); }}>Edit</button>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.showPage(this.props)}
      </div>
    );
  }
}
