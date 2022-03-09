// implement your server here
// require your posts router and connect it here
const express = require("express");
const server = express();
const postsRoutes = require("./posts/posts-router");
server.use(express.json());
server.use("/api/posts", postsRoutes);
const Posts = require("./posts/posts-model");

module.exports = server;
