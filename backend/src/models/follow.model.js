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

followSchema.index({
    follower: 1,
    following: 1
}, { unique: true })

const followModel = mongoose.model("follow", followSchema)

module.exports = followModel