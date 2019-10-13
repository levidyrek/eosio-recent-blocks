/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';

const addBlockReducer = (state, action) => {
  const { blockId, block } = action.payload;
  state.blocks[blockId] = block;
};

const clearRecentBlocksReducer = () => ({ recents: {} });

const updateRecentBlocksReducer = (state, action) => ({ recents: action.payload });

const recentBlocksSlice = createSlice({
  slice: 'recentBlocks',
  initialState: {
    blocks: {},
    recents: [],
  },
  reducers: {
    addBlock: addBlockReducer,
    clearRecentBlocks: clearRecentBlocksReducer,
    updateRecentBlocks: updateRecentBlocksReducer,
  },
});

export default recentBlocksSlice.reducer;
