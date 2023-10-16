import React from "react";

const MultiInput = ({
  name,
  id,
  value,
  setData,
  data,
  handleChange,
  handleAdd,
  placeholder,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => handleAdd(name)}
        type="button"
        className="  absolute  -right-40 w-40 h-12 rounded-md shadow-md text-black flex items-center  justify-center border-2 top-7 -translate-y-1/2 "
      >
        Add {name}
      </button>
      <label
        htmlFor={name}
        className="  absolute   -left-40 w-40 h-12 rounded-md shadow-md text-black flex items-center  justify-center border-2 top-7 -translate-y-1/2 "
      >
        {name}
      </label>
      <div className="flex flex-col gap-4">
        {data[name]}
        {data[name].map((item, index) => {
          return (
            <input
              className="w-40 h-12 mx-2 border-2 rounded-md focus:outline-none px-4"
              type="text"
              name={name}
              id={id}
              value={item}
              placeholder={placeholder}
              onChange={(e) => {
                const Item = data[e.target.name];
                Item[index] = e.target.value;
                setData({...data, [e.target.name]: Item});
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MultiInput;
