import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { auth, } from "../auth/Firebase";
function AskQues() {
  const navigate = useNavigate()
  const [img, setImg] = useState();
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
    try {
      setIsloading(true);
      if (img) {
        var reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
        reader.onload = async () => {
          await fetch(`${url}/api/v1/questions`, {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              image: reader.result,
              title: title,
              description: desc,
              name: user.displayName,
            }),
          }).then(res => {
        setIsloading(false)
        navigate("/questions")
          })
        }
        reader.onerror = (error) => {
          console.log("err: ", error);
        };
      } else {
        await fetch(`${url}/api/v1/questions`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            title: title,
            description: desc,
            name: user.displayName,
          }),
        }).then((res) => {
          navigate("/questions")
          setIsloading(false);
        });
      }
      // setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" w-full h-100 bg-black bg-opacity-90 py-5 ">
        <div className="flex h-full ">
          {/* side nav */}

          <div className="w-56 h-100 border-r-2 flex flex-col gap-2 p-4 ">
            <Link
              to="/questions"
              className="text-white font-light bg-black bg-opacity-50 p-2 rounded-sm"
            >
              All Questions
            </Link>
          </div>

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
                    <h2 className="text-2xl text-white">Question Title</h2>
                    <input
                      type="text"
                      className="mt-2 p-4 w-full text rounded-xl"
                      placeholder="Enter Title"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="overfloy-y-scroll">
                    <h2 className="text-2xl text-white">
                      Question Description
                    </h2>
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
                      <div
                        className="text-dark me-5 text-3xl"
                        style={{
                          marginTop: "-50px",
                          position: "relative",
                          float: "right",
                        }}
                      >
                        <input
                          type="file"
                          id="img-upload"
                          onChange={(e) => setImg(e)}
                          style={{ display: "none" }}
                        />
                        <label className="cursor-pointer" htmlFor="img-upload">
                          <FaImage></FaImage>
                        </label>
                      </div>
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
                          Ask now
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

export default AskQues;
