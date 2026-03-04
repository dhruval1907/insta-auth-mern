const mongoose = require("mongoose")

const followSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    followers: [{
        type: String
    }],
    following: [{
        type: String
    }]
}, {
    timestamps: true
})


const followModel = mongoose.model("follow", followSchema)

module.exports = followModel