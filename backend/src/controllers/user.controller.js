const followModel = require("../models/follow.model")

async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }

    const followerRecord = await followModel.findOneAndUpdate(
        { username: followerUsername },
        { $push: { following: followeeUsername } },
        { upsert: true, returnDocument: 'after' }
    )

    const followeeRecord = await followModel.findOneAndUpdate(
        { username: followeeUsername },
        { $push: { followers: followerUsername } },
        { upsert: true, returnDocument: 'after' }
    )

    const isAlrteadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })


    if (isAlrteadyFollowing) {
        return res.status(200).json({
            message: "you are already following this user"
        })
    }

    res.status(201).json({
        message: "you are now following the user ",
        follow: followeeRecord
    })
}



module.exports = {
    followUserController
}   