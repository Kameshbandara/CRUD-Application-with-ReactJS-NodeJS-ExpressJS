import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }
  , []);




  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/delete/${id}`);
        setBooks(books.filter(book => book.Id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  }



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);




  
  return (
    <div className='w-full h-screen bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-4'>Library Book List </h1>

      

      <div>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>ID</th>
              <th className='py-2 px-4 border-b'>Title</th>
              <th className='py-2 px-4 border-b'>Author</th>
              <th className='py-2 px-4 border-b'>Genre</th>
              <th className='py-2 px-4 border-b'>Year</th>
              <th className='py-2 px-4 border-b'>ISBN</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className='py-2 px-4 border-b'>{book.Id}</td>
                <td className='py-2 px-4 border-b'>{book.Title}</td>
                <td className='py-2 px-4 border-b'>{book.Author}</td>
                <td className='py-2 px-4 border-b'>{book.Genre}</td>
                <td className='py-2 px-4 border-b'>{book.Year}</td>
                <td className='py-2 px-4 border-b'>{book.ISBN}</td>
                <td>
                      <div className="d-flex">
                        <Link to={`/read/${book.Id}`} className="btn btn-success me-2">View</Link>
                        <Link to={`/edit/${book.Id}`} className="btn btn-primary me-2">Edit</Link>
                        <button onClick={() => handleDelete(book.Id)} className="btn btn-danger">Delete</button>
                      </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-4 mt-4">
        <Link to="/add" className="btn btn-success">Add New Book +</Link>
      </div>



    </div>
  )
}

