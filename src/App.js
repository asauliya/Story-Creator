import React from 'react';
import Login from "./components/login"
import Navbar from "./components/navbar"
import Signup from "./components/signup"
import Leaderboard from './components/leaderboard';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Mystories from './components/mystories';
import StoryState from './context/StoryState';
import Story from './components/story';
import Alert from './components/Alert';

function App() {

  return (
    <StoryState>
    <Navbar/>
    <Alert/>
    <div className="container">
      <div className="row">
        <div className="col-8">
          <Routes>
              <Route index element={<Home />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="signup" element={<Signup />} />
              <Route exact path='mystories' element={<Mystories/>} />
              <Route exact path='story/:id' element={<Story/>} />
              {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </div>
        <div className="col-4">
          <Leaderboard/>
        </div>
      </div>
    </div>
  </StoryState>
  );
}

export default App;
