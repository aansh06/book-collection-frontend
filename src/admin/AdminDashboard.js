
import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import bookServices from "../services/bookService";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
  });

  // Fetch all books
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookServices.getAllBooks(); 
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books.");
    }
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleShowModal = (book = null) => {
    setCurrentBook(book);
    if (book) {
      setFormData(book); 
    } else {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        publicationYear: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBook(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentBook) {
     
      try {
        await bookServices.updateBook(currentBook.isbn, formData);
        toast.success("Book updated successfully!");
        loadBooks(); 
      } catch (error) {
        console.error("Error updating book:", error);
        toast.error("Failed to update book.");
      }
    } else {
      
      try {
        await bookServices.addBook(formData);
        toast.success("Book added successfully!");
        loadBooks(); 
      } catch (error) {
        console.error("Error adding book:", error);
        toast.error("Failed to add book.");
      }
    }
    handleCloseModal();
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await bookServices.deleteBook(id);
        toast.success("Book deleted successfully!");
        loadBooks(); 
      } catch (error) {
        console.error("Error deleting book:", error);
        toast.error("Failed to delete book.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Welcome, Admin</h1>
       

       
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Publication Year</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publicationYear}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowModal(book)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(book.isbn)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentBook ? "Edit Book" : "Add Book"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Publication Year</Form.Label>
                <Form.Control
                  type="text"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {currentBook ? "Update Book" : "Add Book"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Button variant="primary" onClick={() => handleShowModal()}>
          Add New Book
        </Button>
      </div>
    </>
  );
};

export default AdminDashboard;
