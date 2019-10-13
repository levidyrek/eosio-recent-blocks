import { combineReducers } from 'redux';
import recentBlocksReducer from './recentBlocks';

export default combineReducers({
  recentBlocks: recentBlocksReducer,
});
