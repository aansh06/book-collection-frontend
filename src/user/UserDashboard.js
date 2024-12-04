// import React, { useEffect, useState } from "react";
// import bookServices from "../services/bookService";
// import Navbar from "../Navbar";
// import "./UserDashboard.css";

// const UserDashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [isbn, setIsbn] = useState("");
//   const [error, setError] = useState("");
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     bookServices.getAllBooks().then((response) => setBooks(response.data));
//   }, []);

//   const fetchBookByIsbn = async () => {
//     try {
//       const response = await bookServices.getBookByIsbn(isbn);
//       setBook(response.data);
//       setError(""); 
//     } catch (error) {
//       setBook(null);
//       setError("Book not found. Please check the ISBN and try again.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchBookByIsbn();
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="user-dashboard">
//         <h2>Welcome to Hexa Library</h2>
        
//         <form onSubmit={handleSubmit} className="isbn-form">
//           <input
//             type="text"
//             value={isbn}
//             onChange={(e) => setIsbn(e.target.value)}
//             placeholder="Enter ISBN"
//             required
//             className="isbn-input"
//           />
//           <button type="submit" className="fetch-button">
//             Fetch Book
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         {book && (
//           <div className="book-info">
//             <h3 className="book-title">{book.title}</h3>
//             <p className="book-author">
//               <strong>Author:</strong> {book.author}
//             </p>
//             <p>
//               <strong>Description:</strong> {book.description}
//             </p>
//             {book.imageUrl && (
//               <img
//                 src={book.imageUrl}
//                 alt={book.title}
//                 className="book-image"
//               />
//             )}
//           </div>
//         )}
        
//         <h3>All Available Books</h3>
//         <ul className="book-list">
//           {books.map((b) => (
//             <li key={b.id}>
//               <span className="book-title">{b.title}</span>
//               <span className="book-author">by {b.author}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from "react";
import bookServices from "../services/bookService";
import Navbar from "../Navbar";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");
  const [book, setBook] = useState(null);
  const [noBooksAvailable, setNoBooksAvailable] = useState(false);
  const [showAllButtonVisible, setShowAllButtonVisible] = useState(false);

  useEffect(() => {
    bookServices.getAllBooks().then((response) => {
      setBooks(response.data);
      setNoBooksAvailable(response.data.length === 0); // Check if no books are available
    });
  }, []);

  const fetchBookByIsbn = async () => {
    try {
      const response = await bookServices.getBookByIsbn(isbn);
      setBook(response.data);
      setError("");
      setBooks([]); // Remove available books when a book is fetched
      setNoBooksAvailable(false); // Reset 'No books available' when user fetches a book
      setShowAllButtonVisible(true); // Show the "Show All Books" button after a book is fetched
    } catch (error) {
      setBook(null);
      setError("Book not found. Please check the ISBN and try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookByIsbn();
  };

  const handleShowAllBooks = () => {
    bookServices.getAllBooks().then((response) => {
      setBooks(response.data);
      setBook(null); // Clear any book that was being viewed
      setError(""); // Clear error message
      setShowAllButtonVisible(false); // Hide the "Show All Books" button when all books are shown
    });
  };

  return (
    <>
      <Navbar />
      <div className="user-dashboard">
        <h2>Welcome to Hexa Library</h2>
        
        <form onSubmit={handleSubmit} className="isbn-form">
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            required
            className="isbn-input"
          />
          <button type="submit" className="fetch-button">
            Search
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {book && (
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-image"
              />
            )}
          </div>
        )}

       
        {noBooksAvailable && !book && <p className="no-books-message">No books available at the moment</p>}

        
        {!book && !noBooksAvailable && (
          <>
            <h3>All Available Books</h3>
            <ul className="book-list">
              {books.map((b) => (
                <li key={b.isbn}>
                  <span className="book-title">{b.title}</span>
                  <span className="book-author">by {b.author}</span>
                  <span className="book-isbn">ISBN: {b.isbn}</span>
                </li>
              ))}
            </ul>
          </>
        )}

{showAllButtonVisible && (
          <button onClick={handleShowAllBooks} className="show-all-books-button">
            Show All Books
          </button>
        )}
       
        <div className="action-buttons">
          <button className="dummy-button">Issue Book</button>
          <button className="dummy-button">Return Book</button>
        </div>

        
      </div>
    </>
  );
};

export default UserDashboard;
