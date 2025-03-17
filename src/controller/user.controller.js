const pool = require("../config/db.config");

exports.getindex = (req, res) => {
    res.render("index");
}

exports.signup = (req, res) => {
    res.render("signup");  
}

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const foundedUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (foundedUser.rows.length > 0) { 
        return res.status(409).send({
            message: "Bunday email allaqachon mavjud!",
        });
    }

    await pool.query(`INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);

    res.redirect("/api/users/signup");  
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (users.rows.length === 0) {
        return res.status(401).send({ message: "Email yoki parol xato!" });
    }

    const foundedUser = users.rows[0];

    if (foundedUser.password !== password) {
        return res.status(401).send({ message: "Email yoki parol xato!" });
    }

    const blogs = await pool.query(`SELECT * FROM blogs WHERE user_id = $1`, [foundedUser.id]);  

    res.render("blog", { user: foundedUser, blogs: blogs.rows });
}

exports.getUserBlogs = async (req, res) => {
    const { userId } = req.params;

    const foundedUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);

    if (foundedUser.rows.length === 0) {
        return res.status(404).send({ message: "User topilmadi!" });
    }

    const userBlogs = await pool.query(`SELECT * FROM blogs WHERE user_id = $1`, [userId]);  

    res.render("blog", { blogs: userBlogs.rows, user: foundedUser.rows[0] });
};

exports.createBlog = async (req, res) => {
    const { title, content, userId } = req.body;
    
    await pool.query(
        `INSERT INTO blogs(title, content, user_id,created_at) VALUES ($1, $2, $3,NOW())`,
        [title, content, Number(userId)] 
    );

    res.redirect(`/api/users/blog/${userId}`);
}
