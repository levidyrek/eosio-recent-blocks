/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';
import EOSIOClient from '../controller/EOSIOClient';
import { NUM_RECENT_BLOCKS } from '../constants';
import { createRandomIds } from '../utils';

const addBlockReducer = (state, action) => {
  const block = action.payload;
  state.blocks[block.id] = block;
};

const clearRecentBlocksReducer = () => ({ recents: {} });

const updateRecentBlocksReducer = (state, action) => ({ recents: action.payload });

/**
 * Replaces a block object matching the given id in recents with a new object.
 * If a block with the given id is not found, nothing is updated.
 *
 * @param {array} state current redux state
 * @param {object} action action with payload containing a recent block id
 */
const replaceRecentBlockReducer = (state, action) => {
  const { recents } = state;
  const { id, data } = action.payload;
  const index = recents.findIndex(recent => recent.id === id);

  if (index !== -1) {
    recents.splice(index, 1, data);
  }
};

const recentBlocksSlice = createSlice({
  slice: 'recentBlocks',
  initialState: {
    // The key-value block "cache"
    blocks: {},
    // List of objects referencing the most recent blocks from the cache
    recents: [],
  },
  reducers: {
    addBlock: addBlockReducer,
    clearRecentBlocks: clearRecentBlocksReducer,
    replaceRecentBlock: replaceRecentBlockReducer,
    updateRecentBlocks: updateRecentBlocksReducer,
  },
});

const {
  addBlock,
  clearRecentBlocks,
  replaceRecentBlock,
  updateRecentBlocks,
} = recentBlocksSlice.actions;

export default recentBlocksSlice.reducer;

/**
 * Reloads the configured number of most recent blocks.
 *
 * @param {function} dispatch the redux dispatch function
 */
export const reloadRecentBlocks = dispatch => {
  dispatch(clearRecentBlocks());

  // Use objects with random IDs for placeholder blocks while the actual block data is fetched.
  // Adding these synchronously prevents random asynchronous behavior.
  const placeholderIds = createRandomIds(NUM_RECENT_BLOCKS);
  const placeholderBlocks = createPlaceholderBlocks(placeholderIds);
  dispatch(updateRecentBlocks(placeholderBlocks));

  const addRecentBlock = block => {
    dispatch(addBlock(block));
    dispatch(replaceRecentBlock({ id: placeholderIds.shift(), data: block }));
  };
  fetchRecentBlocks(addRecentBlock);
};

const createPlaceholderBlocks = ids =>
  ids.map(id => ({
    fetching: true,
    id,
  }));

/**
 * Fetches the configured number of most recent blocks. Each block is passed to the given
 * callback when it is fetched.
 *
 * @param {function} blockFetchedCallback callback that is passed a block's data when each
 * block is fetched
 */
const fetchRecentBlocks = blockFetchedCallback => {
  const blockClient = new EOSIOClient();

  // Begin the promise chain by fetching the head block
  let chain = blockClient.getHeadBlock();

  // Fetch each previous block's data sequentially by passing the current block's data to
  // the client
  const addToChain = () => {
    chain = chain.then(block => {
      blockFetchedCallback(block);
      return blockClient.getPrevBlock(block);
    });
  };

  // Continue the chain until the configured number of blocks is met
  Array(NUM_RECENT_BLOCKS - 1)
    .fill()
    .forEach(addToChain);

  // Handle the arrival of the last block
  chain.then(blockFetchedCallback);
};

/**
 * Maps the recentBlocks state to a list of recent blocks.
 *
 * @param {object} state the redux recentBlocks state
 */
export const getRecentBlocks = state => {
  const { blocks, recents } = state;
  return recents.map(recent => {
    if (!recent.fetching) {
      return blocks[recent.id];
    }
    return recent;
  });
};
