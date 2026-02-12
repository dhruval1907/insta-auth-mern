const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel