import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Routes,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import Profile from "./components/views/Profile";
import UserProfile from "./components/views/UserProfile";
import Signup from "./components/views/Signup";
import CreatePost from "./components/views/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, [dispatch, history]);
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/signup" component={Signup} />
      <Route path="/createPost" component={CreatePost} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Navbar />
        <Routing />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
