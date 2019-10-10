import React, { Component } from 'react';

class RecentBlocks extends Component {
  initialState = {
    blocks: [],
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
  }

  loadRecentBlocks = () => {
    const blocks = Array(10)
      .fill()
      .map(() => ({
        id: this.getRandomNumber(),
      }));

    this.setState({
      blocks,
    });
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
