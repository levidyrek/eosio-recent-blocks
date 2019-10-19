import React from 'react';
import './App.css';
import RecentBlocks from './containers/RecentBlocks';
import logo from './logo.png';
import './stylesheets/App.css';

function App() {
  return (
    <div className="App">
      <img className="logo" src={logo} alt="EOSIO logo" />
      <h1 className="title">EOSIO Recent Blocks</h1>
      <RecentBlocks />
    </div>
  );
}

export default App;
