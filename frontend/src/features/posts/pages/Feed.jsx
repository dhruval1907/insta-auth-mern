import React from 'react'
import "../../posts/shaders/post.scss";
import Post from '../components/Post';



const Feed = () => {
    return (
        <div >
            <main>
                <div className="feed">
                    <div className="posts">
                        <Post/>
                        <Post/>
                        <Post/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Feed