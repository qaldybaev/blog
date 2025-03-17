const express = require("express");
const path = require("path");
const { APP_PORT } = require("./config/app.config");
const userRoutes = require("./routes/user.routes");
const createTable = require("./model/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));


createTable().then(data => console.log(data)).catch(err => {
    console.log(err.message);
    process.exit(1);
});


app.use("/api/users", userRoutes);


app.all("*", (req, res) => {
    res.status(404).send({
        message: `Given URL: ${req.url} is not found`
    });
});


app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}/api/users`);
});
