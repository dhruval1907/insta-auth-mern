const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

postRouter.get("/posts", identifyUser, postController.getUserPost)

postRouter.get("/posts/:postId", identifyUser, postController.getAllDataPost)

module.exports = postRouter

// const express = require("express")
// const postRouter = express.Router()
// const postController = require("../controllers/post.controller")
// const multer = require("multer")
// const upload = multer({ storage: multer.memoryStorage() })

// postRouter.post("/", upload.single("image"), postController.createPostController)

