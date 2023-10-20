import React from "react";
import {AiFillHeart} from "react-icons/ai";
import axios from "axios";
import {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

const SecondPost = ({post, setPost, postId}) => {
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });
  const handleLike = async (postId) => {
    try {
      await axios.post("/post/like", {postId, userId});
      const Posts = await axios.get(`/post/${postId}`);
      setPost([Posts.data.Post]);

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
      const Posts = await axios.get(`/post/${postId}`);
      setPost([Posts.data.Post]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (postId) => {
    if (comment.length > 0) {
      try {
        const commentPost = await axios.post("/post/comment", {
          postId,
          comment,
          userId,
        });

        const comments = await axios.post("/post/getComments", {postId});

        setCommentsArray(comments.data.comments);
        setComment("");
        if (commentPost.data.success) {
          console.log(comment.data);
          setMessage({
            success: "Your Comment Created Successfully.",
            error: "",
          });
        } else {
          setMessage({
            success: "",
            error: "Your Comments Is Not Created yet.",
          });
        }
        setTimeout(() => {
          setMessage({error: "", success: ""});
        }, 5000);
        //
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await axios.post("/post/getComments", {postId});
        setCommentsArray(comments.data.comments);
        console.log(comments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, []);

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
      {[post]?.map((item, index) => {
        return (
          <div
            key={index}
            className="p-10 relative  rounded-lg shadow-lg bg-[#e9e9e9] flex flex-col border-2 border-black items-center justify-center "
          >
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
              <span>{item.likedBy.length} </span>
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
            <div></div>
            <div className="flex my-10 gap-10 items-center justify-around">
              <input
                placeholder="Type Your Comments Here."
                className="w-[500px] border-2 border-black px-5 py-2 rounded-lg placeholder:text-black/75"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={() => handleComment(item._id)}
                className="px-5 py-2 border-2 border-black/50 rounded-md bg-white flex items-center justify-center "
              >
                Send
              </button>
            </div>
            <div>
              {message.success ? (
                <h2 className="text-green-500 text-2xl font-bold my-10 mx-4">
                  {message.success}
                </h2>
              ) : (
                ""
              )}
              {message.error ? (
                <h2 className="text-red-500 text-2xl font-bold my-10 mx-4">
                  {message.error}
                </h2>
              ) : (
                ""
              )}
            </div>

            <div className="w-full my-10  flex flex-col items-between justify-center gap-10 ">
              {commentsArray?.map((item, index) => {
                console.log(item);

                return (
                  <div className="relative ">
                    <div className="flex justify-around items-center gap-4 ">
                      <img
                        src={item.user.imageUrl}
                        alt="user profile image"
                        className="w-12 rounded-full cursor-pointer"
                        onClick={() => {
                          window.location = `/user/${item.user._id}`;
                        }}
                      />

                      <p className="relative right-[140px] text-xl">
                        username :{item.user.username}
                      </p>
                      <p className="relative right-[140px] text-xl">
                        commnet : {item.comment}
                      </p>
                      <p
                        onClick={async () => {
                          const commentId = item._id;

                          const likeComment = await axios.post(
                            "/post/comment/like",
                            {
                              commentId,
                              userId,
                            }
                          );
                          const getComment = await axios.post(
                            "/post/getComments",
                            {
                              postId: item.postId,
                            }
                          );
                          setCommentsArray(getComment.data.comments);
                        }}
                      >
                        <AiFillHeart
                          className={`${
                            item.likes.includes(userId) ? "text-red-500" : ""
                          } cursor-pointer text-3xl`}
                        />
                        {item.likes.length}
                      </p>
                      <p className="absolute left-0 text-xl text-black">
                        {formatDate(item.createdOn)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecondPost;
