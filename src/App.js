import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home postId="1"/>
      </header>
    </div>
  );
}

export default App;
