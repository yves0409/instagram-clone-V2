import React from "react"
import './App.css';
import Navbar from "./components/Navbar"
import { BrowserRouter as Routes,Route } from 'react-router-dom'
import Home from "./components/views/Home"
import Login from "./components/views/Login"
import Profile from "./components/views/Profile"
import Signup from "./components/views/Signup"



function App() {
  return (
    <Routes>
    <Navbar/>
    
    <Route path="/login" component={Login}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/" exact component={Home}/>
    
    </Routes>
  
  );
}

export default App;
