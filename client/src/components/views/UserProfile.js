import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setuserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setuserProfile(result);
        console.log(result);
      });
  }, [userid]);
  return (
    <>
      {userProfile ? (
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
              <h4>{userProfile.user.name} </h4>
              <h5>{userProfile.user.email} </h5>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                  margin: "10px",
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>20k followers</h6>
                <h6>640 following</h6>
              </div>
            </div>
          </div>
          <div className="post-gallery">
            {userProfile.posts.map((item) => {
              return (
                <img
                  className="post-item"
                  key={item._id}
                  src={item.photo}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h5>Loading...</h5>
      )}
    </>
  );
};

export default UserProfile;
