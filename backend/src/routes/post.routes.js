const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ Storage: multer.memoryStorage() })
postRouter.post("/", upload.single("image"), postController.createpostController)


module.exports = postRouter