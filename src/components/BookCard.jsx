import { useContext, useState } from "react";
import dataContext from "../context/datacontext";
import { Link } from "react-router-dom";
import "../css/BookCard.css";
const BookCard = ({ fetchData }) => {
  const { books, setBooks } = useContext(dataContext);
  const [readMoreStates, setReadMoreStates] = useState(
    books.reduce((acc, book, index) => {
      acc[index] = false;
      return acc;
    }, {})
  );

  const handleGenreClick = (genre) => {
    fetchData(genre);
  };
  const handleReadMoreToggle = (index) => {
    setReadMoreStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="container">
      <div className="sidemenu">
        <header>Book by Genre </header>
        <ul className="items">
          <li onClick={() => handleGenreClick("All Genre")}>All Genre</li>
          <li onClick={() => handleGenreClick("Business")}>Business</li>
          <li onClick={() => handleGenreClick("Science")}>Science</li>
          <li onClick={() => handleGenreClick("Fiction")}>Fiction</li>
          <li onClick={() => handleGenreClick("Philosophy")}>Philosophy</li>
          <li onClick={() => handleGenreClick("Biology")}>Biology</li>
        </ul>
      </div>

      <div className="container_items">
        <div className="container_first">
          <h1 className="first_title">Recommended</h1>
          <div className="main_container">
            {books.map((book, index) => (
              <div key={index} className="book_card">
                <Link to={`/books/${book.id}`}>
                  <div className="book_image_container">
                    {book.volumeInfo && book.volumeInfo.imageLinks && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        className="book_image"
                      />
                    )}
                  </div>
                </Link>

                <div className="book_card_details">
                  <h4>{book.volumeInfo.title}</h4>
                  <p>{book.volumeInfo.authors}</p>
                  <p>
                    {
                      readMoreStates[index]
                        ? book.volumeInfo.description ||
                          "No description available" // Check if description exists or provide a default message
                        : book.volumeInfo.description
                        ? book.volumeInfo.description.substring(0, 200) + "..."
                        : "No description available" // Check if description exists or provide a default message
                    }
                    <button
                      style={{ width: "100px" }}
                      onClick={() => handleReadMoreToggle(index)}
                    >
                      {readMoreStates[index] ? "show less" : "read more"}
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
