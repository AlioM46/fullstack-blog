import axios from "axios";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import ArchivePosts from "../components/ArchivePosts";
const Archives = () => {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  // for get user id
  useEffect(() => {
    const jwt = cookies.access_token; // Replace with your actual JWT
    const [header, payload, signature] = jwt.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const userId = decodedPayload.token;
    setUserId(userId);
  }, [cookies.access_token]);

  // for fetching user saved Posts.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(userId);
        const posts = await axios.get(`/post/user/save/${userId}`);
        console.log(posts.data);
        setPosts(posts.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [userId]);

  return (
    <div>
      <ArchivePosts setPosts={setPosts} posts={posts} userId={userId} />
    </div>
  );
};

export default Archives;
