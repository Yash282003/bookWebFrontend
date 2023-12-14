import { useContext, useState, useEffect } from "react";
import dataContext from "../context/datacontext";
import { useParams } from "react-router-dom";
import "../css/BookDetailsPage.css";

const BookDetailsPage = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  const { id } = useParams();
  const { books, setBooks } = useContext(dataContext);
  const [details, setDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const selectedBook = books.find((book) => book.id.toString() === id);

    if (selectedBook) {
      setDetails(selectedBook);
    }
  }, [id, books]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rating: rating,
      comment: comment,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    try {
      const response = await fetch(`https://bookweb-backend-yx1p.vercel.app/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log("Review submitted successfully");
        setReviews([...reviews, reviewData]);
        setRating("");
        setComment("");
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  return (
    <>
      <div className="book_details">
        {details ? (
          <div className="details">
            <img
              src={details.volumeInfo.imageLinks.thumbnail}
              alt={details.volumeInfo.title}
              className="book_image"
            />
            <h2>{details.volumeInfo.title}</h2>
            <div>
              {auth ? (
                <form className="form" onSubmit={handleSubmit}>
                  <div>
                    <h2>Write a customer review</h2>
                  </div>
                  <div>
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      name="rating"
                    >
                      <option value="">Select</option>
                      <option value="1">1- Bad</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    
                  </div>
                  <div>
                    <label />
                    <button className="primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div>user not found</div>
              )}
            </div>
            <div className="reviews">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <p>{`Rating: ${review.rating}`}</p>
                  <p>{`Comment: ${review.comment}`}</p>
                  <p>{`User: ${review.user.name}`}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default BookDetailsPage;