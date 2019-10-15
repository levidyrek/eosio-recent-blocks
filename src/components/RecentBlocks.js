import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';

function RecentBlocks(props) {
  const { blocks, isFetchingBlocks, reloadRecentBlocks } = props;

  const blockElems = blocks.map(block => <Block key={block.id} block={block} />);

  return (
    <div className="RecentBlocks">
      <button type="button" onClick={reloadRecentBlocks} disabled={isFetchingBlocks}>
        Load
      </button>
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
  reloadRecentBlocks: PropTypes.func.isRequired,
};

export default RecentBlocks;
