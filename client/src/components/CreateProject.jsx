import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/Firebase";
function CreateProject() {
  const navigate = useNavigate()
  const [user, setuser] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [isloading, setIsloading] = useState(false);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  useEffect(() => {
    auth.onAuthStateChanged((users) => {
      if (users) {
        setuser(users);
      } else {
      }
    });
  }, [user]);
  const handleask = async (e) => {
    e.preventDefault();
    setIsloading(true);
    fetch(`${url}/api/v1/task/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.task) {
          fetch(`${url}/api/v1/tasks`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              task: {
                title: title,
                description: desc,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setIsloading(false);
              navigate("/tasks")
            });
        } else {
          fetch(`${url}/api/v1/tasks`, {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              name: user.displayName,
              email: user.email,
              tasks: [
                {
                  title: title,
                  description: desc,
                },
              ],
            }),
          }).then((res) => {
            navigate("/tasks")
            console.log("created");
          });
        }
      });
  };
  return (
    <>
      <div className=" w-full h-100 bg-black bg-opacity-90 py-5 ">
        <div className="flex h-full ">
          {/* ask question fields */}

          <div className=" w-full ">
            <div className="w-4/5 m-auto  p-4 flex flex-col gap-10 ">
              <div>
                <h1 className="text-white text-2xl">
                  Hi {user.displayName} !!
                </h1>
                <p className="text-white">Have a doubt? Clear it right away!</p>
              </div>
              <form onSubmit={handleask}>
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl text-white">Task Title</h2>
                    <input
                      type="text"
                      className="mt-2 p-4 w-full text rounded-xl"
                      placeholder="Enter Title"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="overfloy-y-scroll">
                    <h2 className="text-2xl text-white">Task Description</h2>
                    <div>
                      <textarea
                        className="w-full p-4 rounded-xl"
                        name="description"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Enter Description"
                        onChange={(e) => setDesc(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    {isloading ? (
                      <>
                        <div className="bg-gray-300 text-black  rounded-lg w-40">
                          <div className="flex justify-center items-center">
                            <Oval
                              height={35}
                              width={35}
                              color="#4fa94d"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                              ariaLabel="oval-loading"
                              secondaryColor="#4fa94d"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="bg-btn_primary px-8 py-2 rounded-sm text-white"
                        >
                          Create Task
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
