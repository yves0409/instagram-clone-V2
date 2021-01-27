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

  const updatePhoto = () => {
    console.log("updated");
  };
  return (
    <div style={{ maxWidth: "600px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "Loading.."}
              alt="profilepic"
            />
          </div>
          <div>
            <div>
              <h4>{state ? state.name : "loading.."} </h4>
              <h6>{state ? state.email : "loading.."} </h6>
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
        </div>

        <button
          className="btn waves-effect waves-light #82b1ff blue accent-1"
          style={{ margin: "10px 0px 10px 52px", fontSize: "11px" }}
          onClick={() => {
            updatePhoto();
          }}
        >
          Update Pic
        </button>
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
