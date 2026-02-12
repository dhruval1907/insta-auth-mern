const postModel = require("../models/post.model")


async function createpostController(req, res) {
    console.log(req.body);
}

module.exports = {
    createpostController
}