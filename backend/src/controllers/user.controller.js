const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

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

    const isFollowExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFollowExists) {
        return res.status(404).json({
            message: "user not found"
        })
    }


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
            message: "you are already following this user",
            follow: followeeRecord
        })
    }

    res.status(201).json({
        message: "you are now following the user ",
        follow: followeeRecord
    })
}


async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: "you are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: "you have unfollowed this user"
    })
}


module.exports = {
    followUserController,
    unfollowUserController
}   