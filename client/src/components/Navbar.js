import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const showList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/createpost">Create post</Link>
        </li>,
        <li>
          <Link to="/followedusersposts">Users I follow</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light #9e9e9e grey
"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
            style={{ marginRight: "10px" }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          Yvestagram
        </Link>
        <ul id="nav-mobile" className="right">
          {showList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
