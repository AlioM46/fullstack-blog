import React, {useState} from "react";
import MultiInput from "../components/multiInput";
import axios from "axios";
import {useCookies} from "react-cookie";
const CreatePost = () => {
  const [data, setData] = useState({
    header: "",
    article: [""],
    images: [""],
    categories: [""],
    likes: 0,
    comments: [""],
    coverImage: "",
  });
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [swap, setSwap] = useState(false);
  const handleAdd = (section) => {
    const newSection = [...data[section], ""];
    console.log(newSection);

    setData({...data, [section]: newSection});
  };

  const handleSubmit = async (e) => {
    const jwt = cookies.access_token; // Replace with your actual JWT
    const [header, payload, signature] = jwt.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const userId = decodedPayload.token;
    e.preventDefault();

    try {
      const res = await axios.post(
        "/post/create",
        {
          ...data,
          postOwner: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#eee]">
      <form
        onSubmit={handleSubmit}
        className=" relativew-full h-full flex flex-col justify-center  items-center gap-10 text-black p-10"
      >
        {/*  */}

        <div className="relative  grid grid-cols-3  w-[450px] justify-items-end">
          <label
            htmlFor="header"
            className=" col-span-1 mr-5 w-full h-12 rounded-md shadow-md text-black flex items-center  justify-center border-2 bottom-0 float-left "
          >
            Header
          </label>
          <input
            name="header"
            id="header"
            placeholder="( Required )"
            className=" h-12 mx-2 px-4 border-2 col-span-2 w-full rounded-md focus:outline-none  "
            type="text"
            onChange={(e) => setData({...data, header: e.target.value})}
          />
        </div>

        <div className="relative  grid grid-cols-3  w-[450px] justify-items-end">
          <label
            htmlFor="coverImage"
            className=" col-span-1 mr-5 w-full h-12 rounded-md shadow-md text-black flex items-center  justify-center border-2 bottom-0 float-left "
          >
            Cover Image
          </label>
          <input
            name="coverImage"
            id="coverImage"
            placeholder="Your Blog Post Banner. ( Required )"
            className=" h-12 mx-2 px-4 border-2 col-span-2 w-full rounded-md focus:outline-none  "
            type={swap ? "file" : "text"}
            onChange={(e) => setData({...data, coverImage: e.target.value})}
          />
          <button
            className=" mt-4 col-span-1 mr-5 w-full h-12 rounded-md shadow-md text-black flex items-center  justify-center border-2 bottom-0 float-left "
            onClick={() => setSwap(!swap)}
          >
            {!swap ? "Pick File" : "Url"}
          </button>
        </div>

        <MultiInput
          name={"images"}
          id={"images"}
          setData={setData}
          data={data}
          handleAdd={handleAdd}
        />

        <MultiInput
          name={"article"}
          id={"article"}
          setData={setData}
          data={data}
          placeholder={"( Required )"}
          handleAdd={handleAdd}
        />

        <MultiInput
          name={"categories"}
          id={"categories"}
          setData={setData}
          data={data}
          handleAdd={handleAdd}
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

export default CreatePost;
