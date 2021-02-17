import React, { Component } from "react";
import "./ProfileView.css";
import axios from "axios";
class ProfileView extends Component {
  state = {
    user: { username: "", name: "", pimage: "" },
    suggestions: [
      // { suggestionImage: "post4.png", suggestionName: "Tony Stark" },
      // { suggestionImage: "post.png", suggestionName: "Steve Rogers" },
      // { suggestionImage: "post3.png", suggestionName: "Natasha" },
      // { suggestionImage: "post2.png", suggestionName: "Bruce Banner" },
    ],
  };

  // 0e4afcd1-fb89-405b-a089-69e8c8acf781
  componentDidMount() {
    // bio: "I am steve";
    // email: "the@test.com";
    // isPublic: 1;
    // name: "Steve Rogers";
    // pimage: "default.png";
    // pw: "123456789";
    // uid: "0e4afcd1-fb89-405b-a089-69e8c8acf781";
    // username: "winterSoldier";

    axios.get("/api/user/b1cccaaf-70db-4493-b750-48ddd4953420").then((obj) => {
      // console.log(obj);
      let user = obj.data.data[0];
      console.log(user);
      this.setState({
        user : user
      });
    })
    // .then(()=>{
    //   return axios.get("/api/request/suggestions/0e4afcd1-fb89-405b-a089-69e8c8acf781")
    // })
    // .then(obj =>{
    //   // console.timeLog(obj);
    //   let suggestions = obj.data.suggestions;
    //   this.setState({
    //     user : user,
    //     suggestions : suggestions
    //   })
    // })
  }

  render() {
    return (
      <div className="profile-view">
        <div className="user">
          <div className="user-image">
            <img src={this.state.user.pimage} alt="user.png" />
          </div>
          <div className="user-detail">
            <div className="username">{this.state.user.name}</div>
            <div className="fullname">{this.state.user.username}</div>
          </div>
        </div>
        <div className="all-suggestions">
          <text>Suggestions For You</text>
          <a href="">See All</a>
        </div>
        <div className="suggestions">
          {this.state.suggestions.map((suggestion) => {
            return (
              <div key = {suggestion.uid}className="suggestion-user">
                <div className="suggestion-user-image">
                  <img src={suggestion.pimage} alt="" />
                </div>
                <div className="container2">
                  <div className="suggestion-user-name">{suggestion.name}</div>
                  <button className="suggestion-user-follow">Follow</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="profileview-links">
          <a href="">About</a>
          <a href="">Help</a>
          <a href="">Press</a>
          <a href="">API</a>
          <a href="">Jobs</a>
          <a href="">Privacy</a>
          <a href="">Terms</a>
          <a href="">Locations</a>
          <a href="">Top Accounts</a>
          <a href="">HashTags</a>
          <a href="">Languages</a>
          <text>© 2021 INSTAGRAM FROM FACEBOOK</text>
        </div>
      </div>
    );
  }
}

export default ProfileView;
