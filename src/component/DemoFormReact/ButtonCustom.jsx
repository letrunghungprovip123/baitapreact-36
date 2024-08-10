import React from "react";

const ButtonCustom = ({
  content,
  type = "button",
  bgColor = "bg-blue-500",
  onClick,
  disabled = false,
}) => {
  return (
    <>
      {disabled ? (
        <button
          type={type}
          className={`py-2 px-5 text-white rounded-md ${bgColor == "bg-blue-500" ? "bg-blue-300" : "bg-yellow-300"} cursor-not-allowed`}
          onClick={onClick}
          disabled
        >
          {content}
        </button>
      ) : (
        <button
          type={type}
          className={`py-2 px-5 text-white rounded-md ${bgColor} hover:bg-white hover:border-blue-500 hover:text-blue-500 border duration-300`}
          onClick={onClick}
        >
          {content}
        </button>
      )}
    </>
  );
};

export default ButtonCustom;
