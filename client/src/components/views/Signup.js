import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mycard">
      <div className="card signup-card">
        <h2>Sign Up</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />

        <input type="text" placeholder="password" />

        <button
          className="btn waves-effect waves-light #82b1ff blue accent-1
"
        >
          Signup
        </button>
        <p>
          <Link to="/signin">Already have an account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
