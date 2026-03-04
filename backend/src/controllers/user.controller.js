const followModel = require("../models/follow.model")

async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }

    // Add followee to follower's following list
    const followerRecord = await followModel.findOneAndUpdate(
        { username: followerUsername },
        { $push: { following: followeeUsername } },
        { upsert: true, returnDocument: 'after' }
    )

    // Add follower to followee's followers list
    const followeeRecord = await followModel.findOneAndUpdate(
        { username: followeeUsername },
        { $push: { followers: followerUsername } },
        { upsert: true, returnDocument: 'after' }
    )

    res.status(201).json({
        message: "you are now following the user ",
        follow: followeeRecord
    })
}



module.exports = {
    followUserController
}