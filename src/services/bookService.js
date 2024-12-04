import axios from "axios";

const API_URL = "http://localhost:8080/api/book";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.jwt;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getAllBooks = () => {
  return axiosInstance.get("/all");
};

const getBookByIsbn = (id) => {
  return axiosInstance.get(`/${id}`);
};

const addBook = (bookItem) => {
  console.log(bookItem);
  return axiosInstance.post("/add", bookItem);
};

const updateBook = (id, updatedBook) => {
  return axiosInstance.put(`/update/${id}`, updatedBook);
};

const deleteBook = (id) => {
  return axiosInstance.delete(`/delete/${id}`);
};

const BookService = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookByIsbn,
};

export default BookService;
