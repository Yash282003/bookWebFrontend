import React, { useState, useEffect, useContext } from "react";
import "../css/Books.css";
import { BsSearch } from "react-icons/bs";
import { MdTrolley } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import dataContext from "../context/datacontext";
const Books = () => {
  const auth = localStorage.getItem("user");
  const [menuOpen, setMenuOpen] = useState(false);
  const { books, setBooks } = useContext(dataContext);
  const { searchKey, setSearchKey } = useContext(dataContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Signup");
  };
  const fetchData = async (searchKey) => {
    try {
      let url;
      if (searchKey) {
        url = `http://localhost:5000/products?searchKey=${searchKey}`;
      } else {
        url = "http://localhost:5000/products"; 
      }
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(url)
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(searchKey);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <>
      <div class="background-container">
        <nav>
          <div className="title">
            <div className="title">
              MYBOOK{" "}
              <span>
                <MdTrolley />
              </span>
            </div>
          </div>
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {auth ? (
            <ul className={menuOpen ? "open" : ""}>
              <li>
                <Link to="/Blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/Blogs">Explorer</Link>
              </li>
              <li>
                <Link to="/Blogs">Shop</Link>
              </li>

              <li>
                {" "}
                <Link to="/Signup" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="open">
              <>
                <li>
                  <Link to="/Signup">SignUp</Link>
                </li>

                <li>
                  <Link to="/Login">LogIn</Link>
                </li>
              </>
            </ul>
          )}
        </nav>
        <div className="content">
          <p className="headline">
            READ AND ADD <br /> YOUR INSIGHT{" "}
          </p>
          <p className="sub_headline">
            Find your favourite book and read it here for free
          </p>
          <div className="search_button">
            <form onSubmit={handleSubmit}>
              <span id="icon">
                <BsSearch />
              </span>
              <input
                type="text"
                className="search"
                value={searchKey}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search Book"
              />
            </form>
          </div>
        </div>
      </div>
      <BookCard fetchData={fetchData} />
    </>
  );
};
export default Books;
