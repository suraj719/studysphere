import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Loader from "./Loader";
import { auth, provider } from "../auth/Firebase";
import { signInWithPopup } from "firebase/auth";
import { Oval } from "react-loader-spinner";
export default function Question() {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [load, setload] = useState(false);
  const [ans, setAns] = useState("");
  const [user, setuser] = useState([]);
  const [ques, setQues] = useState([]);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  useEffect(() => {
    auth.onAuthStateChanged((users) => {
      if (users) {
        setuser(users);
      } else {
        setuser("");
      }
    });
  }, []);
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setQues(data.ques);
        setIsloading(false);
        // console.log(data.ques.answers)
      });
    // setIsloading(false);
  };
  useEffect((id) => {
    fetchdata();
  }, []);
  const handleans = async () => {
    setload(true);
    if (user) {
      fetch(`${url}/api/v1/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer: ans,
          answeredBy: user.displayName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setQues(data.ques);
          setAns("");
          setload(false);
        });
    } else {
      signInWithPopup(auth, provider).then((data) => {
        fetch(`${url}/api/v1/questions/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answer: ans,
            answeredBy: data.user.displayName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data)
            setQues(data.ques);
            setAns("");
            setload(false);
          });
        // console.log(data.user)
        setuser(data.user);
        localStorage.setItem("email", data.user.email);
      });
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-56 h-100 border-r-2 flex flex-col gap-2 p-4 ">
          <Link
            to="/questions"
            className="text-white text-xl font-bold bg-black bg-opacity-50 p-2 rounded-sm"
          >
            <p className="flex items-center gap-2">
              <FaArrowLeft></FaArrowLeft>All Questions
            </p>
          </Link>
        </div>
        {/* <div className="border-t flex gap-2 px-4 py-2 flex-col">
          <h2 className="text-2xl font-bold">{ques.title}</h2>
          <p className="text-ellipsis line-clamp-1">{ques.description}</p>
        </div> */}
        <div className="flex flex-col justify-center  w-full text-white min-h-[20rem]">
          {isloading ? (
            <>
              <div>
                <Loader />
              </div>
            </>
          ) : (
            <>
              <div
                className="p-10 min-h-[40rem]"
                style={{ boxShadow: "white 0px 1px 4px" }}
              >
                <h2 className="text-3xl font-bold border-b border-gray-300">
                  {ques.title}
                </h2>
                <p className="mt-5 text-xl font-semibold">{ques.description}</p>
                {ques.image ? (
                  <>
                    <img
                      src={ques.image}
                      alt="img"
                      className="w-full"
                      style={{
                        height: "25rem",
                        width: "100rem",
                        //   objectFit: "contain",
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
                <div className="mt-10">
                  {ques.answers ? (
                    <>
                      <p className="text-xl font-bold my-3">
                        {ques.answers.length > 0 ? (
                          <>{ques.answers.length}Answers:</>
                        ) : (
                          <>Be the First to answer this Question:</>
                        )}
                      </p>
                      <div>
                        <textarea
                          className="w-full rounded-sm p-4 text-lg text-dark"
                          name="answer"
                          id="ans"
                          placeholder="Enter your answer!!"
                          rows="5"
                          cols="30"
                          style={{
                            color: "black",
                          }}
                          onChange={(e) => setAns(e.target.value)}
                          required-
                        ></textarea>
                        {load ? (
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
                              onClick={handleans}
                              className="bg-btn_primary px-8 py-2 mt-1 rounded-lg text-white"
                            >
                              Post your answer
                            </button>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col mt-10">
                        {ques.answers.map((ans, index) => {
                          return (
                            <div className="border-b mt-5" key={index}>
                              <h1 className="font-semibold text-lg">
                                {ans.answer}
                              </h1>
                              <h1 className="float-right font-bold text-2xl">
                                answered by: {ans.answeredBy}
                              </h1>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
