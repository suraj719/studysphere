import React from "react"
import { Route, Navigate } from "react-router-dom"
import { UserAuth } from "../contexts/AuthContext"

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = userAuth()

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return currentUser ? <Component {...props} /> : <Navigate to="/" />
//       }}
//     ></Route>
//   )
// }


const PrivateRoute = ({ children }) => {
    const { currentUser } = UserAuth();
  
    if (!currentUser) {
      return <Navigate to='/' />;
    }
    return children;
  };
  
  export default PrivateRoute;