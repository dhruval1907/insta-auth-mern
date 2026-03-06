import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [post, setPost] = useState("");
    const [feed, setFeed] = useState([]);

    return (
        <PostContext.Provider value={{ loading, post, feed, setloading, setPost, setFeed }}>
            {children}
        </PostContext.Provider>
    );
};