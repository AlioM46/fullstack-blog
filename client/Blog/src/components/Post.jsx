import React from "react";
import {AiFillHeart} from "react-icons/ai";
import axios from "axios";
import {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

const Post = ({post, setPosts}) => {
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const handleLike = async (postId) => {
    try {
      await axios.post("/post/like", {postId, userId});
      const Posts = await axios.get("/post/posts");
      setPosts(Posts.data.posts);
      // console.log(Posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.post(`/post/user/${userId}`, {userId});
        setUserInfo(user.data.user);
      } catch (error) {}
    };
    fetchUser();
  }, [userId]);

  // Getting userId
  useEffect(() => {
    const jwt = cookies.access_token; // Make sure this contains a valid JWT
    if (jwt) {
      const parts = jwt.split(".");
      if (parts.length === 3) {
        const [, payload] = parts; // The payload part of the JWT
        try {
          const decodedPayload = JSON.parse(atob(payload));
          const ID = decodedPayload.token;
          setUserId(ID);
        } catch (error) {
          console.error("Error decoding JWT payload:", error);
        }
      } else {
        console.error("Invalid JWT format: It should have three parts.");
      }
    } else {
      console.error("JWT is missing or invalid.");
    }
  }, [cookies.access_token]);

  const handleSave = async (postId) => {
    try {
      const res = await axios.post("/post/save", {postId, userId});
      const Posts = await axios.get("/post/posts");
      setPosts(Posts.data.posts);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    // const minutes = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `Just Now`;
    } else if (minutes >= 1 && minutes < 60) {
      return `${minutes} Minute${minutes > 1 ? "s" : ""} Ago`;
    } else if (hours >= 1 && hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} Ago`;
    } else if (days === 1) {
      return `Yesterday. `;
    } else if (days > 1) {
      return `${days} Days Ago `;
    }
  };

  return (
    <div>
      {post?.map((item, index) => {
        return (
          <div
            key={index}
            className="p-10 relative  rounded-lg shadow-lg bg-[#e9e9e9] flex flex-col border-2 border-black items-center justify-center "
          >
            <div className="absolute left-10 top-10">
              <h2>{formatDate(item.createdOn)}</h2>
            </div>
            <h2 className="text-4xl uppercase font-bold text-center my-10 ">
              {item.header}
            </h2>
            <img
              className="rounded-lg"
              src={item.coverImage}
              alt={item.header}
            />
            <div>
              {/* main */}

              <div className="flex flex-wrap gap-4 font-bold text-xl p-4">
                {item.article.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
              {/* main */}
            </div>
            <div
              onClick={() => {
                handleLike(item._id);
              }}
              className="flex items-center px-5 py-2 border my-4 border-black/50 justify-center gap-4 bg-[#e8e8e8] shadow-lg cursor-pointer text-black"
            >
              <button>
                <AiFillHeart
                  className={`${
                    item.likedBy.includes(userId)
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                />
              </button>
              <span>{item.likedBy.length}</span>
            </div>
            <div
              onClick={() => handleSave(item._id)}
              className="flex items-center px-5 py-2 border my-4 border-black/50 justify-center gap-4 bg-[#e8e8e8] shadow-lg cursor-pointer text-black"
            >
              <button>
                {item.savedBy.includes(userId) ? "UNSAVE" : "SAVE"}
              </button>
              <span>{item.savedBy.length}</span>
            </div>
            <div className="flex gap-4 border border-black p-4">
              <img
                className="w-24 h-24 rounded-lg "
                src={userInfo.profileImage}
                alt="user image Profile."
              />
              <a
                href={`/user/${userId}`}
                className="flex items-center font-bold text-2xl"
              >
                View Profile
              </a>
            </div>
            <a
              // onClick={() => {}}
              href={`/post/${item._id}`}
              className="absolute bottom-10 right-10 rounded-md bg-[#393939] text-white px-5 py-2 hover:bg-[#292929]  duration-300 "
            >
              VIEW POST
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
