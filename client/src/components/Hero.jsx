import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <>
      <div className="w-full flex justify-between items-center  p-4 bg-black">
        <div className="w-4/5 m-auto flex justify-between items-center gap-6 ">
          <div className="  max-w-lg p-4">
            <h1 className="text-4xl text-white ">
              Simplify Your Student Life, Plan, Track, and Excel!
            </h1>
            <p className="pt-2 pb-2 text-white">
              "Simplify your student life! Our platform helps you effortlessly
              plan, track, and excel in your studies. Stay organized, motivated,
              and achieve academic success with ease!"
            </p>

            <Link to="/tasks" className="bg-white px-6 py-2 rounded-sm">
              Get started
            </Link>
          </div>
          <div className="p-2">
            <img
              src="../management.png"
              alt="not found"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center  p-4 py-8  bg-black ">
        <div className="w-4/5 m-auto flex justify-between items-center gap-6 ">
          <div className="p-2">
            <img
              src="../time.png"
              alt="not found"
              className="w-full rounded-lg"
            />
          </div>
          <div className="  max-w-lg p-4">
            <h1 className="text-4xl text-white ">
              Unlock More Free Time with Smart Coursework Management
            </h1>
            <p className="pt-2 pb-2 text-white">
              Reclaim Your Time: Effortlessly Manage Tasks, Meet Deadlines, and
              Reduce Stress. Stay organized, save time, and focus on what's
              important in your academic journey!"
            </p>
            <Link to="/tasks" className="bg-white px-6 py-2 rounded-sm">
              Get started
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center  p-4 bg-black ">
        <div className="w-4/5 m-auto flex justify-between items-center gap-6 ">
          <div className="  max-w-lg p-4">
            <h1 className="text-4xl text-white">
              Ask Questions, Share Knowledge: Connect, Learn, Grow!
            </h1>
            <p className="pt-2 pb-2 text-white">
              Join a vibrant community of learners. Ask questions, engage in
              thought-provoking discussions, and gain fresh insights to enhance
              your learning journey. Together, let's fuel our passion for
              knowledge
            </p>

            <Link
              to="/questions"
              className="text-text bg-white px-6 py-2 rounded-sm"
            >
              Get started
            </Link>
          </div>
          <div className="p-2">
            <img
              src="../questions.png"
              alt="not found"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
