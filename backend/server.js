require("dotenv").config()
const app = require("./src/app")
const MONGODB = require("./src/config/database")
MONGODB()

app.listen(3000, () => {
    console.log("server is running on 3000");
})