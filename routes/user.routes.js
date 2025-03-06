const { Router } = require("express");

const { getindex, signup, createUser, login, getUserBlogs, createBlog } = require("../controller/user.controller");

const route = Router();


route
    .get("/", getindex)
    .get("/sginup", signup)
    .post("/", createUser)
    .post("/sginup", login)
    .get('/blog/:userId', getUserBlogs)
    .post("/blog", createBlog);


module.exports = route;
