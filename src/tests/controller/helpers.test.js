/* eslint-disable no-undef */
import { fetchRecentBlocks } from '../../eosio/helpers';
import { NUM_RECENT_BLOCKS } from '../../constants';

describe('fetchRecentBlocks', () => {
  test('blocks are fetched', async () => {
    // Add each fetched block to array
    const blocks = [];
    const receive = jest.fn(block => {
      blocks.push(block);
    });

    const client = {
      getHeadBlock: jest.fn().mockResolvedValue({
        id: 1,
        previous: 2,
      }),
      getPrevBlock: jest.fn().mockImplementation(block => ({
        id: block.previous,
        previous: block.previous + 1,
      })),
    };

    await fetchRecentBlocks(client, receive);

    // Number of fetched blocks matches the configured number
    expect(blocks.length).toBe(NUM_RECENT_BLOCKS);

    // Check that blocks are sequential based on the 'previous' attribute
    blocks.forEach((block, i) => {
      if (i > 0) {
        const prev = blocks[i - 1];
        expect(block.id).toBe(prev.previous);
      }
    });
  });

  test('fails when getHeadBlock rejects', async () => {
    const receive = jest.fn();
    const client = {
      getHeadBlock: jest.fn().mockRejectedValue(new Error('Async Error')),
      getPrevBlock: jest.fn().mockResolvedValue({}),
    };

    await expect(fetchRecentBlocks(client, receive)).rejects.toThrow(new Error('Async Error'));
    expect(receive.mock.calls.length).toBe(0);
  });

  test('fails when getPrevBlock rejects', async () => {
    const receive = jest.fn();
    const client = {
      getHeadBlock: jest.fn().mockResolvedValue({}),
      getPrevBlock: jest.fn().mockRejectedValue(new Error('Async Error')),
    };

    await expect(fetchRecentBlocks(client, receive)).rejects.toThrow(new Error('Async Error'));
    expect(receive.mock.calls.length).toBe(1);
  });
});
