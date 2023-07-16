import React, { useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaCircleCheck,
  FaRegCircleXmark,
  FaRegTrashCan,
} from "react-icons/fa6";
export default function Task(props) {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [completed, setCompleted] = useState(props.completed);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  const handlecompl = async (compl) => {
    fetch(`${url}/api/v1/taskcompl/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        completed: compl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCompleted(compl);
      });
  };

  const handledelete = async () => {
    fetch(`${url}/api/v1/taskdel/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle("")
        setCompleted("")
        setDescription("")
      });
  };
  return (
    <>
      <div className="flex text-white text-2xl font-bold items-center justify-between">
        <div className="flex items-center gap-2">
          {completed ? (
            <>
              <div className="text-green-300">
                <FaCircleCheck />
              </div>
            </>
          ) : (
            <>
              <div className="text-red-300">
                <FaRegCircleXmark />
              </div>
            </>
          )}
          <span>{title}</span>
        </div>
        <div>
          <div className="flex gap-3">
            <div
              className=" gap-3"
              style={{ display: toggle ? "flex" : "none" }}
            >
              {completed ? (
                <>
                  <div
                    className="text-red-300"
                    onClick={() => handlecompl(false)}
                  >
                    <FaRegCircleXmark />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-green-300">
                    <FaCircleCheck onClick={() => handlecompl(true)} />
                  </div>
                </>
              )}
              <span className="text-red-400" onClick={handledelete}>
                <FaRegTrashCan />
              </span>
            </div>
            {/* </div> */}
            <div onClick={() => setToggle(!toggle)}>
              {toggle ? (
                <>
                  <FaAngleUp />
                </>
              ) : (
                <>
                  <FaAngleDown />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: toggle ? "block" : "none" }}>
        <p className="text-white mt-3 text-xl group-open:animate-fadeIn">
          {description}
        </p>
      </div>
    </>
  );
}
