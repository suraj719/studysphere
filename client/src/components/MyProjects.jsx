import React, { useEffect, useState } from "react";
import RecentProjects from "./RecentProjects";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Header from "./Header";
import { Link } from "react-router-dom";
import { auth, } from "../auth/Firebase";

// import CreateProject from './CreateProject'

function MyProjects() {
  const [user, setuser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((users) => {
      if (users) {
        setuser(users);
      } else {
      }
    });
  }, [user]);
  return (
    <div className="totaltasks w-full h-screen bg-black bg-opacity-90 ">
      <div className=" w-full ">
        <div className="w-4/5 m-auto  p-4 flex justify-between items-center ">
          <div>
            <h1 className="text-white text-2xl">Hi {user.displayName}</h1>
            <p className="text-white">
              welcom back! Check out Your Tasks
            </p>
          </div>
          <Link to="/todo">
          <button className=" px-4 py-1 gap-2 rounded-md border-2 flex justify-center items-center text-white">
            {" "}
            <AiOutlinePlusCircle /> create
          </button>
          </Link>
        </div>

        <RecentProjects />
      </div>
    </div>
  );
}

export default MyProjects;
