import { JsonRpc } from 'eosjs';
import fetch from 'cross-fetch';

const EOSIO_HOST = 'https://api.eosnewyork.io';

export default class EOSIOClient {
  constructor() {
    this.rpc = new JsonRpc(EOSIO_HOST, { fetch });
  }

  getHeadBlock = () => this.rpc.get_info().then(result => this.getBlock(result.head_block_id));

  getPrevBlock = block => this.getBlock(block.previous);

  getBlock = blockId =>
    this.rpc.get_block(blockId).then(result => ({
      id: result.id,
      previous: result.previous,
    }));
}
