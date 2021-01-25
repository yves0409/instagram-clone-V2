import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myposts, setMyposts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyposts(result.mypost);
      });
  }, []);
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
          <h4>{state ? state.name : "loading"} </h4>
          <h6>{state ? state.email : "loading"} </h6>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
              margin: "10px",
            }}
          >
            <h6>{myposts.length} posts</h6>
            <h6>{state ? state.follower.length : "..."} followers</h6>
            <h6>{state ? state.following.length : "..."} following</h6>
          </div>
        </div>
      </div>
      <div className="post-gallery">
        {myposts.map((item) => {
          return (
            <img className="post-item" key={item._id} src={item.photo} alt="" />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
