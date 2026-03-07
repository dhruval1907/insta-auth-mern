import { getFeed, createPost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext);

    const { loading, post, feed, setloading, setPost, setFeed } = context;

    const handleGetFeed = async () => {
        try {
            setloading(true);

            const data = await getFeed();
            setFeed(data.posts);

        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            setloading(false);
        }
    };

    const handleCreatetpost = async (imageFile, caption) => {
        setloading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...post])
        setloading(false)
    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return { loading, feed, post, handleGetFeed, handleCreatetpost };
};