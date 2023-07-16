import React from "react";
import RecentProjects from "./RecentProjects";
import { AiOutlinePlusCircle } from "react-icons/ai";

function Overview() {
  return (
    <div className=" w-full  ">
      <div className="w-4/5 m-auto  p-4 flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl">Hi! John doe</h1>
          <p className="text-white">welcom back! let's complete your project</p>
        </div>

        <button className=" px-4 py-1 gap-2 rounded-md border-2 flex justify-center items-center text-white">
          {" "}
          <AiOutlinePlusCircle /> create
        </button>
      </div>
      <RecentProjects />
    </div>
  );
}

export default Overview;
