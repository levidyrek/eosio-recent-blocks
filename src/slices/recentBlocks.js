/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';
import EOSIOClient from '../controller/EOSIOClient';
import { NUM_RECENT_BLOCKS } from '../constants';

const beginFetchReducer = state => {
  state.fetching = true;
  state.blocks = [];
  state.error = null;
};

const receiveBlockReducer = (state, action) => {
  const block = action.payload;
  state.blocks.push(block);
};

const endFetchReducer = state => {
  state.fetching = false;
};

const failFetchReducer = (state, action) => {
  const error = action.payload;
  state.error = error;
  state.fetching = false;
};

const recentBlocksSlice = createSlice({
  slice: 'recentBlocks',
  initialState: {
    // List of the most recent blocks
    blocks: [],
    // Error for a failed fetch
    error: null,
    // Indicates whether new blocks are being fetched
    fetching: false,
  },
  reducers: {
    beginFetch: beginFetchReducer,
    endFetch: endFetchReducer,
    failFetch: failFetchReducer,
    receiveBlock: receiveBlockReducer,
  },
});

const { beginFetch, endFetch, failFetch, receiveBlock } = recentBlocksSlice.actions;

export default recentBlocksSlice.reducer;

/**
 * Redux Thunk that reloads recent blocks.
 */
export const reloadRecentBlocks = () => {
  return dispatch => reloadRecentBlocksAction(dispatch);
};

/**
 * Reloads the configured number of most recent blocks.
 *
 * @param {function} dispatch the redux dispatch function
 */
const reloadRecentBlocksAction = dispatch => {
  dispatch(beginFetch());

  const addRecentBlock = block => {
    dispatch(receiveBlock(block));
  };
  const completeFetch = () => {
    dispatch(endFetch());
  };
  const fail = reason => {
    dispatch(failFetch(reason.message));
  };
  fetchRecentBlocks(addRecentBlock, completeFetch, fail);
};

/**
 * Fetches the configured number of most recent blocks. Each block is passed to the given
 * callback when it is fetched.
 *
 * @param {function} receive callback that is passed a block's data when each
 * block is fetched
 * @param {function} complete callback that is called when all recent blocks have been fetched
 * @param {function} fail callback that is called with the error message if an error occurs
 * while fetching blocks
 */
const fetchRecentBlocks = (receive, complete, fail) => {
  const blockClient = new EOSIOClient();

  // Begin the promise chain by fetching the head block
  let chain = blockClient.getHeadBlock();

  // Fetch each previous block's data sequentially by passing the current block's data to
  // the client
  const addToChain = () => {
    chain = chain.then(block => {
      receive(block);
      return blockClient.getPrevBlock(block);
    });
  };

  // Continue the chain until the configured number of blocks is met
  Array(NUM_RECENT_BLOCKS - 1)
    .fill()
    .forEach(addToChain);

  // Handle the arrival of the last block
  chain = chain.then(block => {
    receive(block);
    complete();
  });

  // Handle errors
  chain.catch(reason => {
    fail(reason);
  });
};
