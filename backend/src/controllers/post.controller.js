const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'test',
        folder: "instaclone-post"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })

    console.log();

}

async function getUserPost(req, res) {
    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post fetched successfully",
        posts
    })

}

async function getAllDataPost(req, res) {
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "page not found "
        })
    }

    const isValiduser = post.user.toString() === userId

    if (!isValiduser) {
        return res.status(403).json({
            message: "forbidden content"
        })
    }

    return res.status(200).json({
        message: "post created successfully",
        post
    })

}

module.exports = {
    createPostController,
    getUserPost,
    getAllDataPost
}

