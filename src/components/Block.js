import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SPACE_KEY_CODE } from '../constants';
import '../stylesheets/Block.css';

export default class Block extends Component {
  initialState = {
    active: false,
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
  }

  toggleActiveOnKey = e => {
    if (e.which === SPACE_KEY_CODE) {
      e.preventDefault();
      this.toggleActive();
    }
  };

  toggleActive = () => {
    this.setState(state => ({ active: !state.active }));
  };

  render() {
    const { block } = this.props;
    const { active } = this.state;

    const className = active ? 'active' : '';

    return (
      <div key={block.id} className={`block ${className}`}>
        <div
          className="header"
          tabIndex={0}
          role="button"
          onClick={this.toggleActive}
          onKeyDown={this.toggleActiveOnKey}
        >
          <h3>ID: {block.id}</h3>
          <h5>Timestamp: {block.timestamp}</h5>
          <h5>Transactions: {block.num_transactions}</h5>
        </div>
        <div className="raw">
          <h5>Raw content</h5>
          <pre>{block.raw}</pre>
        </div>
      </div>
    );
  }
}

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    num_transactions: PropTypes.number.isRequired,
    raw: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};
