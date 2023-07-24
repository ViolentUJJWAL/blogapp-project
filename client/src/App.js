import AlertComp from "./Alert";
import AboutPage from "./component/AboutPage";
import Home from "./component/Home/Home";
import MyBlog from "./component/MyBlog";
import NotFoundPage from "./component/NotFound_404.js/NotFound";
import ForgetPage from "./component/authComponent/ForgetPage";
import LogInPage from "./component/authComponent/LogIn";
import SignUpPage from "./component/authComponent/SignUp";
import CreateBlog from "./component/crudComponent/CreateBlog";
import NevBar from "./component/nevBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <Router>
      <NevBar />
      <AlertComp/>
      <Routes>
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/forget" element={<ForgetPage/>} />
        <Route exact path="/createblog" element={(window.localStorage.token)?<CreateBlog />:<Navigate to="/login"/>} />
        <Route exact path={`/${window.localStorage.userName}`} element={(window.localStorage.token)?<MyBlog />:<Navigate to="/login"/>} />
        <Route exact path="/" element={(window.localStorage.token)?<Home />:<Navigate to="/login"/>} />
        <Route exact path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
