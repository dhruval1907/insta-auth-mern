const mongoose = require("mongoose")

function connectTODB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connect to DB");
        })
}

module.exports = connectTODB