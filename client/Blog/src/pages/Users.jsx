import axios from "axios";
import React, {useEffect, useState} from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await axios.get("/post/users/lastusers");
        setUsers(users.data.users);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

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
    <div className="my-10 flex flex-col justify-center items-center gap-10 ">
      <p>USERS FROM LAST 5 DAYS.</p>
      {users.length > 0
        ? users.map((item) => {
            return (
              <div className="flex flex-col items-center gap-4 border-white p-4 rounded-md border-2 ">
                <p>Created From :{formatDate(item.createdOn)} </p>
                <img className="w-[250px]" src={item.imageUrl} />
                <p className=" text-xl text-black/80 my-4 ">{item.username}</p>
                <a href={`/user/${item._id}`}>VISIT Profile</a>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Users;
