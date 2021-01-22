import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.posts);
        setData(result.posts);
      });
  }, []);
  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card homepage-card">
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="pic" />
            </div>
            <i class="material-icons">favorite</i>

            <div className="card-content">
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
