import React from 'react'
import { useState, useRef } from "react";
import "../shaders/create.scss"
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router-dom";

const Createpost = () => {

    const navigate = useNavigate()

    const [caption, setcaption] = useState("")
    const postImageFieldRef = useRef(null)

    const { loading, handleCreatetpost } = usePost()

    function handleSubmit(e) {
        e.preventDefault()
        const file = postImageFieldRef.current.files[0]

        handleCreatetpost(file, caption)

        navigate("/")
    }

    if (loading) {
        return (
            <main>
                <h1>creating post.....</h1>
            </main>
        )
    }

    return (
        <main>
            <div className="form">
                <h1 >create a post</h1>
                <form onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <div className='flex'>
                        <label htmlFor="postimg" className='text1' id='createpostimg'>select an image</label>
                        <input ref={postImageFieldRef} hidden type="file" name="" id="postimg" className='postimg' />
                    </div> <br /> <br /> <br /> <br />
                    <div className='flex'>
                        <label htmlFor="" className='text'>add a caption</label>
                        <input
                            value={caption}
                            onChange={(e) => {
                                setcaption(e.target.value)
                            }}
                            type="text" name="" id="" className='textinp' placeholder='Enter caption' />
                    </div> <br /> <br /> <br /> <br /> <br />
                    <button>create</button>
                </form>
            </div>
        </main>
    )
}

export default Createpost