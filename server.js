const express = require("express")
const { APP_PORT } = require("./config/app.config")
const route = require("./routes/user.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.use("/api/users",route)

app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}/api/users`)
})