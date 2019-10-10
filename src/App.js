import React from 'react';
import './App.css';

import RecentBlocks from './components/RecentBlocks';

function App() {
  return (
    <div className="App">
      <h1>EOSIO Recent Blocks</h1>
      <RecentBlocks />
    </div>
  );
}

export default App;
