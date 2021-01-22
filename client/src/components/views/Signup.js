import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    //Validate email regex
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid email",
        classes: "#e57373 red lighten-2",
      });
      return;
    }

    //request to backend
    fetch("/signup", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({
            html: "Please fill out all the fields",
            classes: "#e57373 red lighten-2",
          });
        } else {
          M.toast({
            html: "Signup successfull",
            classes: "#1de9b6 teal accent-3",
          });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card signup-card">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light #82b1ff blue accent-1
"
          onClick={() => postData()}
        >
          Signup
        </button>
        <p>
          <Link to="/login">Already have an account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
