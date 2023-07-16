import React, { useEffect, useState } from "react";
import { auth } from "../auth/Firebase";
export default function Ques() {
  const [img, setImg] = useState();
  const [ques, setQues] = useState("");
  const [allimgs, setallimgs] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [user,setuser] = useState()
  // auth.onAuthStateChanged(function(user) {
  //   if (user) {
  //     setuser(user)
  //   } else {
  //     setuser("")
  //   }
  // });
  const fetchdata = () => {
    setIsloading(true);
    fetch("https://studysherebackend.onrender.com/api/v1/questions")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // setCases(data.data.posts);
        setallimgs(data.questions);
        setIsloading(false);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (img) {
      var reader = new FileReader();
      reader.readAsDataURL(img.target.files[0]);
      reader.onload = async () => {
        fetch("https://studysherebackend.onrender.com/api/v1/questions", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            image: reader.result,
            description: ques,
            name: auth?.currentUser?.displayName,
          }),
        });
      }
    reader.onerror = (error) => {
      console.log("err: ", error);
    };
  } else {
    fetch("https://studysherebackend.onrender.com/api/v1/questions", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            description: ques,
            name: auth?.currentUser?.displayName,
          }),
        });
  }
  };
  return (
    <>
      <div>
        <input
          placeholder="enter the question"
          onChange={(e) => setQues(e.target.value)}
        />{" "}
        <br />
        <input
          accept="image/"
          type={"file"}
          id="upload"
          onChange={(e) => setImg(e)}
        ></input>
        <button onClick={handlesubmit}>submit</button>
      </div>
      {allimgs.map(ques=> {
        return(<>
          <div>
            <h1>{ques.name}</h1>
            <img src={ques.image} alt="imgsf" style={{width:"5rem"}} />
          </div>
        </>)
      })}
    </>
  );
}
