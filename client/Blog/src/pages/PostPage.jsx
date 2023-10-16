import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SecondPost from "../components/SecondPost";

const PostPage = () => {
  const {postId} = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPostWithId = async () => {
      try {
        const Data = await axios.get(`/post/${postId}`);
        setPost([Data.data.Post]);
      } catch (error) {}
    };
    fetchPostWithId();
  }, []);

  return (
    <div>
      {post?.map((item, index) => {
        return <SecondPost post={item} setPost={setPost} postId={postId} />;
      })}
    </div>
  );
};

export default PostPage;
