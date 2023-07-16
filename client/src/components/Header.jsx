import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { auth, provider } from "../auth/Firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Header = (props) => {
  // console.log(auth?.currentUser?.email)
  const [user, setuser] = useState("");
  // auth.onAuthStateChanged(function(user) {
  //   if (user) {
  //     setuser(user)
  //     console.log(user)
  //   } else {
  //     setuser("")
  //   }
  // });
  // auth.onAuthStateChanged((users) => {
  //   if (users) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     // const uid = users.uid;
  //     // setuser(users)
  //     // console.log(users)
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });
  useEffect(() => {
    auth.onAuthStateChanged((users) => {
      if (users) {
        setuser(users);
      } else {
      }
    });
  }, [user]);
  const handlesignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      setuser(data.user);
      localStorage.setItem("email", data.user.email);
    });
  };
  const handlelogout = async () => {
    await signOut(auth);
    setuser("");
    localStorage.removeItem("email");
  };

  const currentLocation = useLocation();

  return (
    <div>
      <header
        className="w-full px-4 py-4  flex justify-center items-center"
        // style={
        //   currentLocation.pathname === "/planit"
        //     ? { backgroundColor: "#4843EE" }
        //     : { backgroundColor: "transparent" }
        // }
        style={{backgroundColor:"#4843EE"}}
      >
        <nav className="w-11/12  m-auto flex justify-between items-center text-white ">
          <div>
            <Link to="/">
              <h2
                className="text-xl font-semibold font-sans"
                // style={
                //   currentLocation.pathname !== "/"
                //     ? { color: "#ffffff" }
                //     : { color: "#000000" }
                // }
              >
                StudySphere
              </h2>
            </Link>
          </div>
          <div>
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/tasks"
                  className="font-sans"
                  // style={
                  //   currentLocation.pathname !== "/"
                  //     ? { color: "#ffffff" }
                  //     : { color: "#000000" }
                  // }
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/questions"
                  className="font-sans"
                  // style={
                  //   currentLocation.pathname !== "/"
                  //     ? { color: "#ffffff" }
                  //     : { color: "#000000" }
                  // }
                >
                  Questions
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center gap-6  ">
            <div className="flex gap-6">
              {user == "" ? (
                <>
                  <div className="flex">
                    <button
                      onClick={handlesignIn}
                      // style={
                      //   currentLocation.pathname !== "/"
                      //     ? { color: "#ffffff" }
                      //     : { color: "#000000" }
                      // }
                    >
                      Signin With Google
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <button
                      onClick={handlelogout}
                      className="flex justify-center items-center gap-2"
                    >
                      log out
                      <img
                        src={user?.photoURL}
                        alt="usr-img"
                        className="rounded-full w-10"
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
