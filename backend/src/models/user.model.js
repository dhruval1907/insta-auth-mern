const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        // required: true
    },
    email: {
        type: String,
        unique: true,
        // required: true
    },
    passowrd: {
        type: String,
        unique: true,
        // required: true
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/onf7ynga4s/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.jpg"
    }

})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel