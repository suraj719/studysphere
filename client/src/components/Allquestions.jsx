import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { auth } from "../auth/Firebase";
import Loader from "./Loader";
import Question from "./Question";
export default function Allquestions() {
  //   const [user, setuser] = useState("");
  const [questions, setques] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  //   useEffect(() => {
  //     auth.onAuthStateChanged((users) => {
  //       if (users) {
  //         setuser(users);
  //       } else {
  //       }
  //     });
  //   }, [user]);
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/questions`)
      .then((res) => res.json())
      .then((data) => {
        setques(data.questions);
        setIsloading(false);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className=" w-full h-100 bg-black bg-opacity-90 ">
      <div className="flex h-full ">
        <div className="w-56 h-100 border-r-2 flex flex-col gap-2 p-4 ">
          <Link
            to="/questions"
            className="text-white font-light bg-black bg-opacity-50 p-2 rounded-sm"
          >
            All Questions
          </Link>
        </div>

        {/* All questions field */}

        <div className="w-full">
          <div className="w-4/5 m-auto  p-4 flex flex-col gap-16 ">
            <div className="flex justify-between items-center">
              {/* <div>
                  <h1 className='text-white text-2xl'>Hi {user.displayName}!!</h1>
                  <p className='text-white'>welcom back! let's ask some questions.</p>
             </div> */}
              <Link
                to="/ask"
                className=" px-4 py-1 gap-2 rounded-md border-2 flex justify-center items-center text-white"
              >
                {" "}
                <AiOutlinePlusCircle /> Ask
              </Link>
            </div>
            {isloading ? (
              <>
                <div className="w-full h-full">
                    <Loader />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-6 text-white overflow-x-none min-h-[70vh]">
                  {questions.map((ques,index) => {
                    return (
                      <div key={index}>
                        {/* <Question
                          id={ques._id}
                          title={ques.title}
                          description={ques.description}
                        /> */}
                        <div
                          className="border-t flex gap-2 px-4 py-2 flex-col text-white"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "60rem",
                          }}
                        >
                          <Link to={`/questions/${ques._id}`}>
                            <h2 className="text-2xl font-bold">{ques.title}</h2>
                          </Link>
                          <p className="text-ellipsis line-clamp-1">
                            {ques.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
