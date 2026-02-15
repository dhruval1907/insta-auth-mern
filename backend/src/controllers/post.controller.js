const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized accesss"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)


    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'test',
        folder: "instaclone-post"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })


}

async function getUserPost(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token invalid"
        })
    }
    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch {
        return res.status(401).json({
            message: "token invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(201).json({
        message: "Posts fetched successfully.",
        posts
    })

}

async function getAllDataPost(req, res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "invalid token"
        })
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(404).json({
            message: "inavalid token"
        })
    }


    const userId = decoded.id
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

