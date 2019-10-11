import React, { Component } from 'react';
import EOSIOClient from '../controller/EOSIOClient';

class RecentBlocks extends Component {
  initialState = {
    blocks: [],
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
    this.blockClient = new EOSIOClient();
  }

  loadRecentBlocks = () => {
    // Clear current blocks
    this.setState({ blocks: [] });

    let chain = this.blockClient.getHeadBlock();
    const addBlock = block => {
      this.addBlock(block);

      return this.blockClient.getPrevBlock(block);
    };
    const addToChain = () => {
      chain = chain.then(addBlock);
    };

    Array(9)
      .fill()
      .forEach(addToChain);
  };

  addBlock = block => {
    this.setState(state => ({
      blocks: [...state.blocks, block],
    }));
  };

  getRandomNumber = () => {
    const min = 1;
    const max = 1001;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    const { blocks } = this.state;

    const blockElems = blocks.map(block => (
      <div key={block.id}>
        <h3>ID: {block.id}</h3>
      </div>
    ));

    return (
      <div className="RecentBlocks">
        <button type="button" onClick={this.loadRecentBlocks}>
          Load
        </button>
        <div className="blockList">{blockElems}</div>
      </div>
    );
  }
}

export default RecentBlocks;
