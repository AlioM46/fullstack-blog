import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
const ProfileUsers = () => {
  const {userId} = useParams();
  const [user, setUser] = useState({});

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
  //
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
    <div className="flex flex-col items-center justify-center gap-5 text-3xl text-red-500 mt-10">
      <h1>Name : {user.username}</h1>
      <p>Email : {user.email}</p>
      <p>Member Since : {formatDate(user.createdOn)}</p>
      <span>Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla </span>
    </div>
  );
};

export default ProfileUsers;
