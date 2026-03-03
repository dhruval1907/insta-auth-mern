const mongoose = require("mongoose")

const followSchema = mongoose.Schema({
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }]
}, {
    timestamps: true
})


const followModel = mongoose.model("follow", followSchema)