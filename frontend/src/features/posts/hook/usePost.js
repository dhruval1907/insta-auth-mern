import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext);

    const { loading, post, feed, setloading, setPost, setFeed } = context;

    const handleGetFeed = async () => {
        setloading(true);

        const data = await getFeed();
        setFeed(data.posts);

        setloading(false);
    };

    return { loading, feed, post, handleGetFeed };
};