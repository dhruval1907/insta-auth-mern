const postModel = require("../models/post.model")


async function createpostController(req, res) {
    console.log(req.body, req.file);
}

module.exports = {
    createpostController
}