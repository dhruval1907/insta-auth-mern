import React from "react"
import { CiHeart } from "react-icons/ci"
import { FaRegComment } from "react-icons/fa6"
import { IoMdShareAlt } from "react-icons/io"
import "../shaders/post.scss"

const Post = ({ post }) => {

    const user = post?.user

    return (
        <div className="post">
      

            <div className="user">
                <img
                    src={user?.profileImage || "/default-avatar.png"}
                    alt="profile"
                />
                <p>{user?.username}</p>
            </div>

            <img
                src={post?.imgUrl}
                alt="post"
                className="main-image"
            />
            <br />

            <div className="bottom">
                <p className="caption">{post?.caption}</p>
            </div>
            <br />

            <div className="icon" >
                <CiHeart
                    size={28}
                    className={post?.isLiked ? "like" : "not"}
                />
                <FaRegComment size={22} />
                <IoMdShareAlt size={25} />
            </div>

        </div>
    )
}

export default Post