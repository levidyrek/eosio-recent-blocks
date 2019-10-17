/* eslint-disable no-undef */
import EOSIOClient from '../../controller/EOSIOClient';

jest.mock('eosjs');

test('Get Block', () => {
  const client = new EOSIOClient();
  const block = {
    id: '1234',
    previous: '1233',
    transactions: [{ id: 1 }, { id: 2 }],
    timestamp: '2019-10-15T10:48:17.000',
  };
  client.rpc.get_block.mockResolvedValue(block);

  const promise = client.getBlock('1234');
  expect(client.rpc.get_block.mock.calls[0][0]).toBe('1234');
  return expect(promise).resolves.toStrictEqual({
    id: '1234',
    previous: '1233',
    num_transactions: 2,
    raw: JSON.stringify(block, null, 2),
    timestamp: '2019-10-15T10:48:17.000',
  });
});

test('Get Head Block', async () => {
  const client = new EOSIOClient();
  const block = {
    id: '1234',
    previous: '1233',
    transactions: [{ id: 1 }, { id: 2 }],
    timestamp: '2019-10-15T10:48:17.000',
  };
  client.getBlock = jest.fn(() => block);
  client.rpc.get_info.mockResolvedValue({
    head_block_id: '1234',
  });

  const result = await client.getHeadBlock();
  expect(client.getBlock.mock.calls[0][0]).toBe('1234');
  expect(result).toBe(block);
});

test('Get Prev Block', async () => {
  const client = new EOSIOClient();
  const block = {
    id: '1234',
    previous: '1233',
    transactions: [{ id: 1 }, { id: 2 }],
    timestamp: '2019-10-15T10:48:17.000',
  };
  client.getBlock = jest.fn(() => block);

  const result = await client.getPrevBlock(block);
  expect(client.getBlock.mock.calls[0][0]).toBe('1233');
  expect(result).toBe(block);
});
