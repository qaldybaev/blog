const { Router } = require("express");
const path = require("path");
const { readJSONFile, writeJSONFile } = require("../helpers/fs");

const route = Router();


route.get("/", (req, res) => {
    res.render("index");
});

route.get("/sginup", (req, res) => {
    res.render("sginup");
});

route.post("/", (req, res) => {
    const { name, email, password } = req.body;
    const filePath = path.join(__dirname, "..", "data", "user.json");
    const users = readJSONFile(filePath);

    const foundedUser = users.find((user) => user.email === email);

    if (foundedUser) {
        res.status(409).send({
            message: "Bunday email allaqachon mavjud!",
        });
        return;
    }

    const newUser = {
        id: users.at(-1)?.id + 1 || 1,
        name,
        email,
        password,
    };

    users.push(newUser);
    writeJSONFile(filePath, users);

    res.redirect("/api/users/blog"); 
});


route.post("/sginup", (req, res) => {
    const { email, password } = req.body;
    const userFilePath = path.join(__dirname, "..", "data", "user.json");
    const blogFilePath = path.join(__dirname, "..", "data", "blogs.json");
    
    const users = readJSONFile(userFilePath);
    const blogs = readJSONFile(blogFilePath);

    const foundedUser = users.find(
        (user) => user.email === email && user.password === password
    );

    if (!foundedUser) {
        res.status(401).send({
            message: "Email yoki parol xato!",
        });
        return;
    }

    const userBlogs = blogs.filter(blog => blog.email === email && blog.password === password);

    res.render("blog", { user: foundedUser, blogs: userBlogs });
});

const blogsFilePath = path.join(__dirname, "..", "data", "blogs.json");

route.get("/blog", (req, res) => {
    const blogs = readJSONFile(blogsFilePath);
    res.render("blog", { blogs });
});

route.post("/blog", (req, res) => {
    const { title, content } = req.body;
    const blogs = readJSONFile(blogsFilePath);

    const newBlog = {
        id: blogs.at(-1)?.id + 1 || 1,
        title,
        content,
        createdAt: new Date().toLocaleString(),
    };

    blogs.push(newBlog);
    writeJSONFile(blogsFilePath, blogs);

    res.redirect("/api/users/blog"); 
});


module.exports = route;
