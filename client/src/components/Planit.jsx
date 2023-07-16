import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

import CreateProject from "./CreateProject";

function Planit() {
  return (
    <div className=" w-full h-full bg-black bg-opacity-90 ">
      <div className="flex h-full ">
        <div className="w-56 h-100 border-r-2 flex flex-col gap-2 p-4 ">
          <Link
            to="/tasks"
            className="text-white font-light bg-black bg-opacity-50 p-2 rounded-sm"
          >
            My Tasks
          </Link>
        </div>
        <CreateProject />
      </div>
    </div>
  );
}

export default Planit;
