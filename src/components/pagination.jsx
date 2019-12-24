import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Paginathion extends Component {
  showPages = (pages, activePage) => {
    const result = [];
    for (let i = 0; i < pages; i += 1) {
      result.push(
        <span
          className={(i) === activePage ? `recipes__pages-page-active` : `recipes__pages-page`}
          onClick={() => {
            this.props.clicktoPage(i + 1)
          }}>
          {i + 1}
        </span>,
      );
    }
    return result;
  }

  render() {
    const {
      pages,
      activePage,
    } = this.props;
    return (
      <div className="recipes__pages">
        {this.showPages(pages, activePage)}
      </div>
    );
  }
}
Paginathion.propTypes = {
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  clicktoPage: PropTypes.func.isRequired,
};
