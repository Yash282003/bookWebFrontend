import React from "react";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import Logout from "../components/Logout";
import Books from "../components/Books";
import BookDetailsPage  from "../pages/BookDetailsPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateComponent from "../components/PrivateComponent";

function Home() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route exact path="/" element={<Books/>} />
            <Route path="/books/:id" element={<BookDetailsPage/>} />
            <Route path="/Logout" element={<Logout />} />
          </Route>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
