import React, { useEffect } from 'react'
import "../../posts/shaders/post.scss";
import Post from '../components/Post';
import { usePost } from "../hook/usePost";

const Feed = () => {

    const { feed, handleGetFeed } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    return (
        <main>
            <div className="feed">
                <div className="posts">

                    {feed?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}

                </div>
            </div>
        </main>
    )
}

export default Feed