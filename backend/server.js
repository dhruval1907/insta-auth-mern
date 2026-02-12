require("dotenv").config()
const app = require("./src/app")
const MONGO = require("./src/config/database")
MONGO()


app.listen(3000, () => {
    console.log("server is running on 3000");
})