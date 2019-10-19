/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';
import EOSIOClient from '../controller/EOSIOClient';
import { fetchRecentBlocks } from '../controller/helpers';

// Reducers are wrapped with immer by default, so state is not actually mutated
const beginFetchReducer = state => {
  state.fetching = true;
  state.blocks = [];
  state.error = null;
};

const endFetchReducer = state => {
  state.fetching = false;
};

const failFetchReducer = (state, action) => {
  const error = action.payload;
  state.error = error;
  state.fetching = false;
};

const receiveBlockReducer = (state, action) => {
  const block = action.payload;
  state.blocks.push(block);
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

export const { beginFetch, endFetch, failFetch, receiveBlock } = recentBlocksSlice.actions;

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

  const blockClient = new EOSIOClient();
  fetchRecentBlocks(blockClient, addRecentBlock).then(
    () => {
      dispatch(endFetch());
    },
    error => {
      dispatch(failFetch(error.message));
    }
  );
};

// Export private functions for easier unit testing
export const testables = {
  beginFetchReducer,
  endFetchReducer,
  failFetchReducer,
  receiveBlockReducer,
  reloadRecentBlocksAction,
};
