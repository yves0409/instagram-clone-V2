import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadProfilePic = () => {
    const data = new FormData();
    data.append("file", profilePic);
    data.append("upload_preset", "instagram-clone"); //=> name you gave the project in cloudinary
    data.append("cloud_name", "yves"); //=> cloud name used in cloudinary site(top right)
    fetch("https://api.cloudinary.com/v1_1/yves/image/upload", {
      //=> base URL cloudinary + /image/upload

      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFields = () => {
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
        pic: url,
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
  const postData = () => {
    if (profilePic) {
      uploadProfilePic();
    } else {
      uploadFields();
    }
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
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>Set Profile Picture</span>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input type="text" className="file-path-validate" />
          </div>
        </div>

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
