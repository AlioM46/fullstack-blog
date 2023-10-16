import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import ProfilePosts from "../components/ProfilePosts";
const Profile = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await axios.get(`/auth/user/${userId}`);
        setUser(userInfo.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const Info = await axios.get(`/post/user/${userId}`);
      setPosts([Info.data.refershedPosts]);
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      {posts?.map((item, index) => {
        return <ProfilePosts post={item} setPosts={setPosts} />;
      })}
    </div>
  );
};

export default Profile;
