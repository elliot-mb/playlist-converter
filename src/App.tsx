import React from 'react';
import './App.scss';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import {Home} from "./pages/Home/Home";

function App() : React.ReactElement {
  return (
    <div className="App">
      <Router>
        <div className="hero">
          <h1>Playlist Converter</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
