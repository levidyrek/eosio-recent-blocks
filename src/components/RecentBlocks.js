import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SPACE_KEY_CODE } from '../constants';
import '../stylesheets/RecentBlocks.css';

class RecentBlocks extends Component {
  initialState = {
    activeBlocks: {},
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
  }

  toggleBlockActive = blockId => {
    this.setState(state => {
      const activeBlocks = { ...state.activeBlocks };
      const active = !activeBlocks[blockId];
      activeBlocks[blockId] = active;

      return { activeBlocks };
    });
  };

  render() {
    const { activeBlocks } = this.state;
    const { blocks, isFetchingBlocks, reloadRecentBlocks } = this.props;

    const blockElems = blocks.map(block => {
      const active = activeBlocks[block.id];
      const className = active ? 'active' : '';
      const toggleActive = () => {
        this.toggleBlockActive(block.id);
      };

      // Expand block if space key is pressed
      const toggleActiveOnKey = e => {
        if (e.which === SPACE_KEY_CODE) {
          e.preventDefault();
          toggleActive();
        }
      };

      return (
        <div key={block.id} className={`block ${className}`}>
          <div
            className="header"
            tabIndex={0}
            role="button"
            onClick={toggleActive}
            onKeyDown={toggleActiveOnKey}
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
    });

    return (
      <div className="RecentBlocks">
        <button type="button" onClick={reloadRecentBlocks} disabled={isFetchingBlocks}>
          Load
        </button>
        <div className="blockList">{blockElems}</div>
      </div>
    );
  }
}

RecentBlocks.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      num_transactions: PropTypes.number.isRequired,
      raw: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  isFetchingBlocks: PropTypes.bool.isRequired,
  reloadRecentBlocks: PropTypes.func.isRequired,
};

export default RecentBlocks;
