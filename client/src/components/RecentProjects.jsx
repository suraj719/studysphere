import React, { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { auth } from "../auth/Firebase";
import Loader from "./Loader";
import Task from "./Task";
function RecentProjects() {
  // const [user, setuser] = useState("");
  const [isloading, setIsloading] = useState("false");
  const [alltasks, setAlltasks] = useState([]);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  const fetchdata = () => {
    // console.log(user)
    setIsloading(true);
    fetch(`${url}/api/v1/task/${localStorage.getItem("email")}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data.task)
        setAlltasks(data.task.tasks);
        setIsloading(false);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div>
      
      <div className=" w-4/5 m-auto mt-6 border-2 rounded-md border-white p-4">
        {isloading ? (
          <div style={{ height: "80%" }}>
            <Loader />
          </div>
        ) : (
          <>
            <div className="taskst">
              <h1 className="text-center p-4 text-white text-2xl">
                Your Tasks: {alltasks.length}
              </h1>
              {alltasks.map((task, index) => {
                return (
                  <div key={index} className="border-b py-4">
                    <Task
                      title={task.title}
                      description={task.description}
                      id={task._id}
                      completed={task.completed}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecentProjects;
