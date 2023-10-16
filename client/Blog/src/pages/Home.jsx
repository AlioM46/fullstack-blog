import React, {useEffect, useState} from "react";
import axios from "axios";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Getting Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get("/post/posts");
        setPosts(posts.data.posts);
      } catch (error) {}
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-14 px-4">
      {posts.map((item, index) => {
        return (
          <Post
            showVisitPostButton={true}
            key={index}
            post={[item]}
            setPosts={setPosts}
          />
        );
      })}
    </div>
  );
};

export default Home;
