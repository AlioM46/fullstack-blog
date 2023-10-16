import React, {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", user);

      console.log(res);
      if (res.data.success) {
        setCookies(["access_token"], res.data.Token);
        window.localStorage.setItem("userId", res.data.userId);
        window.location.pathname = "/";
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);

      console.log(res);
    } catch (error) {}
  };
  const handleChange = (event) => {
    console.log();
    setUser({...user, [event.target.id]: event.target.value});
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="group relative flex flex-col gap-4 border-2 p-10  border-black/40 overlay-hover:block text-3xl  "
      >
        LOGIN
        <div className="  group-hover:bg-[rgba(0,0,0,.15)] absolute left-0 -z-10  top-0 w-full h-full  duration-200 "></div>
        <div className="w-[500px]">
          <label
            className="  border-2 border-black/50 px-4 text-gray-800 font-mono  inline-flex w-[200px] max-h-[40px]"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={user.email}
            onChange={handleChange}
            type="text"
            className="border-2 w-[250px] float-right border-black/40 text-black"
            id="email"
          />
        </div>
        <div className="w-[500px]">
          <label
            className="  border-2 border-black/50 px-4  text-gray-800 font-mono  inline-flex w-[200px] max-h-[40px]"
            htmlFor="username"
          >
            Usernmae
          </label>{" "}
          <input
            value={user.username}
            onChange={handleChange}
            type="text"
            className="border-2 w-[250px] float-right border-black/40 text-black"
            id="username"
          />
        </div>
        <div className="w-[500px]">
          <label
            className=" border-2 border-black/50 px-4  text-gray-800 font-mono inline-flex w-[200px] max-h-[40px] "
            htmlFor="password"
          >
            Password
          </label>{" "}
          <input
            value={user.password}
            onChange={handleChange}
            type="password"
            className="border-2  float-right w-[250px]  border-black/40 text-black"
            id="password"
          />
        </div>
        <button
          type="submit"
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 bg-gray-800 border-2 border-black/10 px-5 py-2 active:bg-gray-700 duration-200`}
        >
          Submit
        </button>
        <h2
          className={`absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 bg-gray-800 border-2 border-black/10 px-5 py-2 active:bg-gray-700 duration-200`}
        >
          Login
        </h2>
        {success ? (
          <h2 className="text-green-600">You've Logged in Successfully.</h2>
        ) : (
          ""
        )}
        {error && !success ? (
          <h2 className="text-red-600">You Failed with login.</h2>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Login;
