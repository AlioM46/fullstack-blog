import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MultiInput from "../components/multiInput";
import {useCookies} from "react-cookie";
import axios from "axios";
const EditPage = () => {
  const {id} = useParams();
  const [post, setPost] = useState({
    header: "",
    coverImage: "",
    article: "",
  });
  const [swap, setSwap] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const jwt = cookies.access_token; // Replace with your actual JWT
    const [header, payload, signature] = jwt.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const userId = decodedPayload.token;
    setUserId(userId);
  }, [id]);

  // useEffect(() => {}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postRes = await axios.put(`/post/edit/${id}`, {...post});
      // window.location.pathname = "/";
      console.log(postRes);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(post);

  return (
    <div className="flex items-center justify-center bg-[#eee]">
      <form
        onSubmit={handleSubmit}
        className=" relativew-full h-full flex flex-col justify-center  items-center gap-10 text-black p-10"
      >
        {/*  */}

        <label>Header</label>
        <input
          type="text"
          onChange={(e) => setPost({...post, header: e.target.value})}
        />
        <label>Article</label>
        <input
          type="text"
          onChange={(e) => setPost({...post, article: e.target.value})}
        />
        <label>CoverImage</label>
        <input
          type="text"
          onChange={(e) => setPost({...post, coverImage: e.target.value})}
        />

        {/*  */}
        <button
          type="submit"
          className="absolute top-20 right-20 rounded-lg font-mono font-semibold bg-[#e4e4e4] border-2 border-black/50 shadow-lg flex items-center justify-center px-4 py-2 text-black"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default EditPage;
