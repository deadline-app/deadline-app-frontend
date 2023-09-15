import React from "react";
import { IoCreateSharp } from "react-icons/io5";

const OpenMenuButton = ({ toggle }) => {
  return (
      <div className="fixed bottom-[20px] right-[30px] w-[40px] h-[40px] bg-white rounded-md flex justify-center cursor-pointer"
           onClick={toggle}>
        <IoCreateSharp className="my-auto text-xl text-neutral-900" />
      </div>
  );
};

export default OpenMenuButton;
