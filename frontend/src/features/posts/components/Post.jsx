import React from 'react'
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";

const Post = ({ user, post }) => {
    return (
        <div className="post">
            <div className="user">
                <img src={user.profileImage} alt="" />
                <p>{user.username}</p>
            </div>
            <img src={post.imgUrl} alt="" className='main-image' />
            <div className="bottom">
                <p className="caption"> {post.caption}</p>
            </div> <br />
            <div className="icon">
                <FcLike />
                <FaRegComment />
                <IoMdShareAlt />
            </div>


        </div>
    )
}

export default Post