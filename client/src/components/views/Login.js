import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mycard">
      <div className="card login-card">
        <h2>Login</h2>
        <input type="text" placeholder="email" />

        <input type="text" placeholder="password" />

        <button
          className="btn waves-effect waves-light #82b1ff blue accent-1
"
        >
          Login
        </button>
        <p>
          <Link to="/signup">Don't have an account yet? Signup for free !</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
