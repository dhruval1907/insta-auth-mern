import React from 'react'
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";

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
                className='main-image'
            />

            <div className="bottom">
                <p className="caption">{post?.caption}</p>
            </div>

            <br />

            <div className="icon">
                <FcLike size={22} />
                <FaRegComment size={20} />
                <IoMdShareAlt size={22} />
            </div>

        </div>
    )
}

export default Post