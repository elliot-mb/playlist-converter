import React, { useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import {Home} from "./pages/Home/Home";
import {Login} from "./pages/Login/Login"

function App() : React.ReactElement {

  useEffect(() => {
    document.title = "Playlist Converter"
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="hero">
          <h1>Playlist Converter</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
