import React ,{ useState, useEffect }from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import AddCourse from './pages/AddCourse';
import TheQuiz from './pages/TheQuiz';
import jwt_decode from 'jwt-decode';
import MyInfo from './pages/MyInfo';
import AllCourses from './pages/AllCourses';


function App(props) {
  // useEffect( ()=>{
  //   let token = localStorage.getItem("tokens");
  //   console.log(token)
  // })
  const [authTokens, setAuthTokens] = useState();
  // const [ userId , setUserId] = useState("");
  
  const setTokens = (data) => {
  
    if (data) {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
     const  x = localStorage.getItem('tokens') ;
     const user =jwt_decode(x)
     var userID = user.user._id
    //  setUserId(user.user._id)
     console.log(x);
    }
    else {
      console.log("no data ")
    }
   
  }

 
  return (
    //check the user token
    <AuthContext.Provider value = {{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
          <li>
            <Link to="/login">log in</Link>
          </li>
          <li>
            <Link to="/quiz">take a quiz</Link>
          </li>
          <li>
            <Link to="/myinfo">info</Link>
          </li>
        </ul>
        {/* <MyInfo userInfo={props.useID}/> */}
           <AllCourses/>
           <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/myinfo" component={MyInfo} />

          <Route path="/signup" component={Signup} />
          <Route path="/quiz" component={TheQuiz} />

          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;