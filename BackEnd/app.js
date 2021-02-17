const express = require("express");
const app = express();

const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const requestRouter = require("./router/requestRouter");

//get json data in body
app.use(express.json()); 
app.use(express.static("public"));

// USERS : 
// get all users // get a user // create a user // update a user // delete a user.
app.use("/api/user", userRouter);


// POSTS :
// get all posts // get a post // create a post // update a post // delete a post.
// on the basis of id 
app.use("/api/post" , postRouter );
  

// REQUESTS:
//  get all followers // get all following.
// see pending request // send request // accept a pending request // cancel a pending request // unfollow. //suggestions
app.use("/api/request" , requestRouter);




app.listen("3000", function(){
    console.log("app is listening at port 3000");
})

