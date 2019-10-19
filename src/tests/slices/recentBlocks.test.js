/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  beginFetch,
  endFetch,
  failFetch,
  receiveBlock,
  reloadRecentBlocks,
  testables,
} from '../../slices/recentBlocks';
import { fetchRecentBlocks } from '../../eosio/helpers';

const { beginFetchReducer, endFetchReducer, failFetchReducer, receiveBlockReducer } = testables;

// Configure mock redux store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../eosio/EOSIOClient');
jest.mock('../../eosio/helpers');

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Reducers do not actually mutate state when passed into redux-starter-kit.
 * They are wrapped with immer to return a new copy.
 */
describe('reducers', () => {
  test('beginFetchReducer', () => {
    const state = {
      fetching: false,
      blocks: [{ id: '1234' }],
      error: 'Something happened',
    };
    beginFetchReducer(state);
    expect(state).toStrictEqual({
      fetching: true,
      blocks: [],
      error: null,
    });
  });

  test('endFetchReducer', () => {
    const state = {
      fetching: true,
      blocks: [{ id: '1234' }],
      error: 'Something happened',
    };
    endFetchReducer(state);
    expect(state).toStrictEqual({
      fetching: false,
      blocks: [{ id: '1234' }],
      error: 'Something happened',
    });
  });

  test('failFetchReducer', () => {
    const state = {
      fetching: true,
      blocks: [{ id: '1234' }],
      error: null,
    };
    const action = {
      type: 'failFetch',
      payload: 'Something happened',
    };
    failFetchReducer(state, action);
    expect(state).toStrictEqual({
      fetching: false,
      blocks: [{ id: '1234' }],
      error: 'Something happened',
    });
  });

  test('receiveBlockReducer', () => {
    const state = {
      fetching: true,
      blocks: [{ id: '1234' }],
      error: null,
    };
    const action = {
      type: 'receiveBlock',
      payload: { id: '1233' },
    };
    receiveBlockReducer(state, action);
    expect(state).toStrictEqual({
      fetching: true,
      blocks: [{ id: '1234' }, { id: '1233' }],
      error: null,
    });
  });
});

describe('Redux thunk reloadRecentBlocks', () => {
  test('dispatches actions on success', async () => {
    const store = mockStore({
      blocks: [],
      error: null,
      fetching: false,
    });

    fetchRecentBlocks.mockImplementation(async (client, receive) => {
      receive({ id: '1234' });
    });

    const expectedActions = [
      { type: beginFetch.type, payload: undefined },
      { type: receiveBlock.type, payload: { id: '1234' } },
      { type: endFetch.type, payload: undefined },
    ];

    await store.dispatch(reloadRecentBlocks());
    expect(store.getActions()).toStrictEqual(expectedActions);
  });

  test('dispatches actions on failure', async () => {
    const store = mockStore({
      blocks: [],
      error: null,
      fetching: false,
    });

    fetchRecentBlocks.mockRejectedValue(new Error('Async Error'));

    const expectedActions = [
      { type: beginFetch.type, payload: undefined },
      { type: failFetch.type, payload: 'Async Error' },
    ];

    await store.dispatch(reloadRecentBlocks());
    expect(store.getActions()).toStrictEqual(expectedActions);
  });
});
