import './App.css';
import React from 'react'
import Navbar from './components/navbar/navbar.jsx'

import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/home/home';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <div className="App">
            <Route path='/' component={Navbar}/>
            <Route exact path='/' component={Home}/>
          </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
