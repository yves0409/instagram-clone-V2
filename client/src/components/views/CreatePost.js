import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
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

    //REQUEST TO BACKEND

    fetch("/createpost", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        picUrl: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({
            html: "all fields are required",
            classes: "#e57373 red lighten-2",
          });
        } else {
          M.toast({
            html: "Posted Succesfully",
            classes: "#1de9b6 teal accent-3",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20PX",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path-validate" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-dark #82b1ff blue darken-1"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
