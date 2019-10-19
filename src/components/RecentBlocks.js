import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import '../stylesheets/RecentBlocks.css';
import loadingGif from '../loading.gif';

function RecentBlocks(props) {
  const { blocks, fetchError, isFetchingBlocks, reloadRecentBlocks } = props;

  const blockElems = blocks.map(block => <Block key={block.id} block={block} />);

  return (
    <div className="RecentBlocks">
      <button
        className="load"
        type="button"
        onClick={reloadRecentBlocks}
        disabled={isFetchingBlocks}
      >
        Load
      </button>
      {isFetchingBlocks && <img className="loading" src={loadingGif} alt="Loading" />}
      {fetchError && <p className="error">Error fetching: {fetchError}</p>}
      <div className="blockList">{blockElems}</div>
    </div>
  );
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
  fetchError: PropTypes.string,
  reloadRecentBlocks: PropTypes.func.isRequired,
};

RecentBlocks.defaultProps = {
  fetchError: '',
};

export default RecentBlocks;
