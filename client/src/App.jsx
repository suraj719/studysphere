import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Planit from "./components/Planit";
import Ques from "./components/Ques";
import PrivateRoute from "./components/PrivateRoute";
import AskQues from './components/AskQues'
// import Myquestions from './components/Allquestions'
import AllQuestions from './components/AllQuestions'
import MyProjects from './components/MyProjects'
import Question from "./components/Question";
function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          {/* <PrivateRoute path='/planit' element={<Planit/>} /> */}
          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <Planit />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <MyProjects />
              </PrivateRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <PrivateRoute>
                <AskQues />
              </PrivateRoute>
            }
          />
            {/* <Route path='/MyQuestions' element={<Myquestions/>}/> */}
            {/* <Route path='/projects' element={<MyProjects/>}/> */}
            <Route path='/questions' element={<AllQuestions/>}/>
            <Route path='/questions/:id' element={<Question/>}/>
        </Routes>
      </AuthProvider>
      {/* <Ques /> */}
        <Footer />
    </>
  );
}

export default App;
