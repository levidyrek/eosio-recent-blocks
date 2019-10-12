import React, { Component } from 'react';
import EOSIOClient from '../controller/EOSIOClient';
import '../stylesheets/RecentBlocks.css';

class RecentBlocks extends Component {
  initialState = {
    activeBlocks: {},
    blocks: [],
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
    this.blockClient = new EOSIOClient();
  }

  loadRecentBlocks = () => {
    // Clear current blocks
    this.setState({ activeBlocks: {}, blocks: [] });

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

  toggleActive = blockId => {
    this.setState(state => {
      const activeBlocks = { ...state.activeBlocks };
      const active = !activeBlocks[blockId];
      activeBlocks[blockId] = active;

      return { activeBlocks };
    });
  };

  render() {
    const { activeBlocks, blocks } = this.state;

    const blockElems = blocks.map(block => {
      const active = activeBlocks[block.id];
      const className = active ? 'active' : '';
      const toggleActive = () => {
        this.toggleActive(block.id);
      };

      return (
        <div
          key={block.id}
          role="button"
          tabIndex={0}
          className={`block ${className}`}
          onClick={toggleActive}
          onKeyDown={toggleActive}
        >
          <div className="header">
            <h3>ID: {block.id}</h3>
            <h5>Timestamp: {block.timestamp}</h5>
            <h5>Transactions: {block.num_transactions}</h5>
          </div>
          <div className="raw">
            <h5>Raw content</h5>
            <pre>{block.raw}</pre>
          </div>
        </div>
      );
    });

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
