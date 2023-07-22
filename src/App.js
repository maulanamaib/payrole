import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
// import { ProtectedRoute } from "./protected";
import ProtectedRoute from "./protected";
import {
  Route,
  useLocation,
  Navigate,
  Routes,
  Router,
  useNavigate,
} from "react-router-dom";

import Cart from "./login/web";
// import Form from "./login";
import Home from "./pages/Home";
import ApiFile from "./home/exexcel";
import Navbar from "./drawer/drawer";
import Reg from "./registrasi/regis";
import Edit from "./edit";
import Verify from "./vrerify";
// import ApiFile from "./exexcel";
function Index() {
  // const navigate = useNavigate();
  // const Login = ({ children}) => {
  //        navigate('/')
  //     } ;
  const PrivateRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    // //  console.log(children)
    const isAuthenticated = role == undefined ? false : true;
    //  localStorage.setItem('data',isAuthenticated.data)
    // console.log(isAuthenticated);
    return (
      <>
        {isAuthenticated ? children : <Navigate to="/" />};
        {/* {<Navigate to="/homecompnent"/>}; */}
        {/* {isAuthenticated    <Navigate to='/homecomponent'/>}; */}
      </>
    );
    // if (isAuthenticated(true) ) {
    //   return children
    // }else(isAuthenticated(false) ) {
    //   return( <Navigate to="/" />)

    // }
  };
  //   const ProtectedRoute = ({isEnabled, ...props}) => {
  // console.log(isEnabled);
  //     return (isEnabled) ? <Route {...props} />
  // const authen = ({ children}) => {
  //       navigate('/homecomponent')
  //     } ;

  const AuthLog = () => {
    const roles = localStorage.getItem("role");
    const auth = roles == undefined;
    if (auth == true) {
      return (
        <>
          <Navigate to="/" />
        </>
      );
    } else if (auth == false) {
      return (
        <>
          <Navigate to="/homecomponent" />
        </>
      );
    }
  };

  //     : <Navigate to="/"/>;

  // };

  return (
    <Routes>
      <Route extac path="/" element={<Cart />} />
      <Route path="reg" element={<Reg />} />
      <Route element={<Navbar />}>
        <Route path="homecomponent" element={<ApiFile />} />
        {/* <Route path='home' element={<ApiFile/>}/> */}
        <Route path="about" element={<Home />} />
        <Route path="edit" element={<Edit />} />
        <Route path="verify" element={<Verify />} />
      </Route>
    </Routes>
  );
}
export default Index;

//   const PrivateRoute = ({ children, ...rest }) => {
//    const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const location = useLocation();
//  return (
//       <Route
//         {...rest}
//         render={({ location }) =>
//           isAuthenticated ? (
//             children
//           ) : (
//             <Navigate
//               to={{
//                 pathname: "/",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     );
//   };

// const Index=()=> {
//   return (
//     <>
//       <PrivateRoute exact path="/" element={<Cart  onLogin={() => {
//             setIsAuthenticated(true);
//           }}/>}  />

//       <Route exact path="/homecomponent" element={<ApiFile/>} />

//       <Route>
//       <Home/>
//       </Route>
//     </>
//   );
//         };

// export default Index;
