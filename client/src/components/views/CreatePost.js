import React from "react";

const CreatePost = () => {
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
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path-validate" />
        </div>
      </div>
      <button className="btn waves-effect waves-dark #82b1ff blue darken-1">
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
