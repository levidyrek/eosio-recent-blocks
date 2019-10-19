/* eslint-disable import/prefer-default-export */
import { NUM_RECENT_BLOCKS } from '../constants';

/**
 * Fetches the configured number of most recent blocks. Each block is passed to the given
 * callback when it is fetched.
 *
 * @param {EOSIOClient} blockClient the EOSIO block client instance
 * @param {function} receive callback that is passed a block's data when each
 * block is fetched
 * @throws if a network failure occurs or any server error responses are received
 */
export const fetchRecentBlocks = async (blockClient, receive) => {
  // Head block is the most recent block
  const head = await blockClient.getHeadBlock();
  receive(head);

  // Continue fetching blocks until the configured number of blocks is met
  let current = head;
  // Use traditional for loop in order to sequentially await
  // eslint-disable-next-line no-restricted-syntax,no-unused-vars
  for (const _ of Array(NUM_RECENT_BLOCKS - 1).fill()) {
    // Allow await in loop since API calls must be sequential
    // eslint-disable-next-line no-await-in-loop
    const prev = await blockClient.getPrevBlock(current);
    receive(prev);
    current = prev;
  }
};
