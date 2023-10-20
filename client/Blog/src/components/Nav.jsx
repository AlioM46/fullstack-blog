import React, {useEffect, useRef, useState} from "react";
import {useCookies} from "react-cookie";
import useGetUserId from "../hooks/useGetUserId";
import axios from "axios";
// import jwt_decode from "jwt-decode";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false); // For Menu
  const [open, setOpen] = useState(false); // For profile
  const [show, setShow] = useState(false); // For Remove Account
  const [height, setHeight] = useState(0);
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const div = useRef();
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setHeight(div.current.offsetHeight);
  }, [div, height]);

  useEffect(() => {
    if (cookies.access_token) {
      const jwt = cookies.access_token; // Replace with your actual JWT
      const [header, payload, signature] = jwt.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const userId = decodedPayload.token; // Assuming 'token' holds the user ID
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(`/post/user/${userId}`);
        console.log(user);
        setUser(user.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  const removeAccount = async () => {
    if (!show) {
      return "Stop Everything Until Agree";
    }
    console.log(userId);
    try {
      const res = await axios.delete(`/auth/remove/${userId}`);
      if (res.data.success) {
        setCookies(["access_token"], "");
        window.localStorage.removeItem("userId");
        window.location.pathname = "/auth";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex relative z-10 justify-around items-center text-3xl gap-4 bg-slate-600 py-4  text-white font-mono "
      ref={div}
    >
      {show && (
        <div
          onClick={() => setShow(false)}
          className="left-1/2 top-1/2  z-10 fixed w-full h-full bg-[rgba(0,0,0,.2)]  -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <div className="  left-1/2  top-1/2 fixed p-10 text-center shadow-lg bg-[#eee] text-black flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <p>Are You Sure You want to remove your account?</p>
            <button
              onClick={removeAccount}
              className="w-40  py-2 my-2 shadow-lg flex items-center justify-center bg-red-600"
            >
              YES
            </button>
            <button
              onClick={() => {
                setShow(false);
                setOpen(false);
              }}
              className="w-40  py-2 my-2 shadow-lg flex items-center justify-center bg-green-600"
            >
              NO
            </button>
          </div>
        </div>
      )}

      <a href="/">Home</a>

      <div className=" flex flex-col items-center ">
        <button onClick={() => setIsOpen(!isOpen)}>POSTS * </button>
        <div
          style={{
            top: `${height}px`,
          }}
          className={`  absolute flex flex-col gap-4 overflow-hidden  bg-gray-500  list-none transition-max-h text-white duration-300 ${
            isOpen ? "max-h-[200px] px-5 py-2 " : "max-h-0 px-5  "
          }`}
        >
          <li>
            <a href="/post/createpost">Create Blog</a>
          </li>
          <li>
            <a href="/post/categories">Categories</a>
          </li>
          <li>
            <a href="/post/archives">Archives</a>
          </li>
        </div>
      </div>

      <a href="/users">Last Joined users.</a>

      {cookies.access_token ? (
        <div className="relative">
          <img
            src={user?.imageUrl}
            className=" w-16 cursor-pointer rounded-full border-2 border-black/40 hover:border-black"
            onClick={() => setOpen(!open)}
          />
          <div
            className={` overflow-hidden absolute top-16 flex flex-col gap-4 justify-center items-center bg-[#eee] duration-200 ${
              open ? "max-h-60" : "max-h-0"
            }`}
          >
            <a
              href="/profile"
              className=" text-black font-mono px-2 bg-[#eee] flex justify-center items-center  h-40 w-40 text-2xl "
            >
              {user?.username} Profile 🧑‍🦰
            </a>
            <button
              onClick={() => {
                removeCookies("access_token"),
                  window.localStorage.removeItem("userId");
              }}
              className="  font-bold text-red-600 font-mono bg-[#eee]  flex justify-center items-center h-40 w-40 text-2xl "
            >
              Logout 🧑‍🦰
            </button>
            <button
              onClick={() => {
                setShow(true);
              }}
              className="font-bold text-red-600 font-mono bg-[#eee]  flex justify-center items-center h-40 w-40 text-2xl "
            >
              REMOVE ACCOUNT!!!
            </button>
          </div>
        </div>
      ) : (
        <div>
          <a href="/auth">Login/Register</a>
        </div>
      )}
    </div>
  );
};

export default Nav;
