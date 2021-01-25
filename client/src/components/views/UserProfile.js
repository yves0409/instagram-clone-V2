import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

//GET THE PROFILE FOR THE USER CLICKED ON (ROUTES/USER)
const UserProfile = () => {
  const [userProfile, setuserProfile] = useState(null);
  const [followbutton, setFollowbutton] = useState(true);
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
        console.log(result);
        setuserProfile(result);
      });
  }, [userid]);

  //FOLLOW USER (ROUTES/USER)
  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, follower: data.follower },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setuserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              follower: [...prevState.user.follower, data._id],
            },
          };
        });
        setFollowbutton(false);
      });
  };

  //UNFOLLOW USER (ROUTES/USER)
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, follower: data.follower },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setuserProfile((prevState) => {
          const updatedFollower = prevState.user.follower.filter(
            (item) => item !== data._id
          );

          return {
            ...prevState,
            user: {
              ...prevState.user,
              follower: updatedFollower,
            },
          };
        });
        setFollowbutton(true);
      });
  };

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
                <h6>{userProfile.user.follower.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              {followbutton ? (
                <button
                  className="btn waves-effect waves-light #82b1ff blue accent-1
"
                  onClick={() => followUser()}
                  style={{ margin: "10px" }}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light #82b1ff blue accent-1
"
                  onClick={() => unfollowUser()}
                  style={{ margin: "10px" }}
                >
                  UnFollow
                </button>
              )}
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
