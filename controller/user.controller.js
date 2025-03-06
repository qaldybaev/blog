const path = require("path");
const { readJSONFile, writeJSONFile } = require("../helpers/fs");

exports.getindex = (req, res) => {
    res.render("index");
}

exports.signup = (req, res) => {
    res.render("sginup");
}

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    const filePath = path.join(__dirname, "..", "data", "user.json");
    const users = readJSONFile(filePath);

    const foundedUser = users.find((user) => user.email === email);

    if (foundedUser) {
        return res.status(409).send({
            message: "Bunday email allaqachon mavjud!",
        });
    }

    const newUser = {
        id: users.at(-1)?.id + 1 || 1,
        name,
        email,
        password,
    };

    users.push(newUser);
    writeJSONFile(filePath, users);

    res.redirect("/api/users/sginup");
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    const userFilePath = path.join(__dirname, "..", "data", "user.json");
    const blogFilePath = path.join(__dirname, "..", "data", "blogs.json");

    const users = readJSONFile(userFilePath);
    const blogs = readJSONFile(blogFilePath);

    const foundedUser = users.find(
        (user) => user.email === email && user.password === password
    );

    if (!foundedUser) {
        return res.status(401).send({
            message: "Email yoki parol xato!",
        });
    }

   
    const userBlogs = blogs.filter(blog => blog.userId === foundedUser.id);

    res.render("blog", { user: foundedUser, blogs: userBlogs });

}

exports.getUserBlogs = (req, res) => {
    const { userId } = req.params;
    const blogsFilePath = path.join(__dirname, "..", "data", "blogs.json");
    const usersFilePath = path.join(__dirname, "..", "data", "user.json");

    const blogs = readJSONFile(blogsFilePath);
    const users = readJSONFile(usersFilePath);

    const foundedUser = users.find(user => user.id === Number(userId));

    if (!foundedUser) {
        return res.status(404).send({
            message: "User topilmadi!",
        });
    }

    const userBlogs = blogs.filter(blog => blog.userId === Number(userId));

    res.render("blog", { blogs: userBlogs, user: foundedUser });
};


exports.createBlog = (req, res) => {
    const blogsFilePath = path.join(__dirname, "..", "data", "blogs.json");
    const { title, content, userId } = req.body;
    const blogs = readJSONFile(blogsFilePath);

    const newBlog = {
        id: blogs.at(-1)?.id + 1 || 1,
        userId: Number(userId),
        title,
        content,
        createdAt: new Date().toLocaleString(),
    };

    blogs.push(newBlog);
    writeJSONFile(blogsFilePath, blogs);
    res.redirect(`/api/users/blog/${userId}`);

}
