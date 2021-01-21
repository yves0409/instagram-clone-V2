import React from "react";

const Profile = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
            }}
            src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
            alt="profilepic"
          />
        </div>
        <div>
          <h4>Sevy Syeol </h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "108%",
            margin: "10px",
          }}
        >
          <h6>36 posts</h6>
          <h6>20k followers</h6>
          <h6>640 following</h6>
        </div>
      </div>
      <div className="post-gallery">
        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />
        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />

        <img
          className="post-item"
          src="https://images.unsplash.com/photo-1550831858-3c2581fed470?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Profile;
