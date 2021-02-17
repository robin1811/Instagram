const express = require("express");
const { getAllPosts, getPostById, UpdatePostById, deletePostById, createPost } = require("../controller/postController");
const postRouter = express.Router();

postRouter.route("/").get(getAllPosts).post(createPost);

postRouter.route("/:pid").get(getPostById).patch(UpdatePostById).delete(deletePostById);

module.exports = postRouter;