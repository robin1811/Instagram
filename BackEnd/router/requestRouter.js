const express = require("express"); 
const { sendRequest, acceptRequest, getPenindRequest, cancelRequest, getAllFollower, getAllFollowing, unfollow, getSuggestions } = require("../controller/requestController");
const { get } = require("./userRouter");

const requestRouter = express.Router();

// "/api/request"
requestRouter.route("").post(sendRequest).delete(cancelRequest);
requestRouter.route("/accept").patch(acceptRequest);
requestRouter.route("/:uid").get(getPenindRequest);
requestRouter.route("/followers/:uid").get(getAllFollower);
requestRouter.route("/following/:uid").get(getAllFollowing);
requestRouter.route("/unfollow").delete(unfollow);
requestRouter.route("/suggestions/:uid").get(getSuggestions);

module.exports = requestRouter;