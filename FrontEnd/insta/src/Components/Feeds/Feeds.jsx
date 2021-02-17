import React, { Component } from "react";
import "./Feeds.css"
import Post from "../Post/Post";

class Feeds extends Component {
  state = {
    posts: [
      { id: 1, username: "kunwarKuljeet", userImage: "default.png", postImage: "post.png", likes: "122223" },
      { id: 2, username: "Kuljeet", userImage: "default.png", postImage: "post2.png", likes: "122112" },
      { id: 3, username: "robin", userImage: "default.png", postImage: "post3.png", likes: "124212" },
      { id: 4, username: "singh", userImage: "default.png", postImage: "post4.png", likes: "122112" },
    ],
  };
  render() {
    return (
      <div className="feeds">
        {this.state.posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    );
  }
}

export default Feeds;
