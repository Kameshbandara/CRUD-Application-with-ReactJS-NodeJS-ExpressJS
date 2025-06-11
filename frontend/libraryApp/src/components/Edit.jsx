import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const { id } = useParams();

    const [value, setValue] = useState({
        title: '',
        author: '',
        genre: '',
        year: '',
        isbn: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/books/${id}`, value);
            console.log('Book updated successfully:', response.data);
            setValue({ title: '', author: '', genre: '', year: '', isbn: '' });
            navigate('/');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };


    const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books/${id}`);
      //console.log("Fetched book:", response.data); 
      setValue({
        title: response.data.Title,
        author: response.data.Author,
        genre: response.data.Genre,
        year: response.data.Year,
        isbn: response.data.ISBN
      });
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);


  return (
     <div className='d-flex vh-100 justify-content-center align-items-center' style={{ backgroundColor: 'blue' }}>

        <div className='w-50 bg-white rounded p-3'> 
            <form onSubmit={handleSubmit}>
                <h2>Update Book</h2>

                    <div className='mb-2'>
                        <label htmlFor="title">Title</label> 
                        <input type="text" id="title" placeholder='Title' className='form-control' required value={value.title}
                        onChange={(e) => setValue({ ...value, title: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="author">Author</label>  
                        <input type="text" id="author" placeholder='Author' className='form-control' required value={value.author}
                        onChange={(e) => setValue({ ...value, author: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="genre">Genre</label>  
                        <input type="text" id="genre" placeholder='Genre' className='form-control' required value={value.genre}
                        onChange={(e) => setValue({ ...value, genre: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="year">Year</label>  
                        <input type="number" id="year" placeholder='Year' className='form-control' required value={value.year}
                        onChange={(e) => setValue({ ...value, year: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="isbn">ISBN</label>  
                        <input type="text" id="isbn" placeholder='ISBN' className='form-control' required value={value.isbn}
                        onChange={(e) => setValue({ ...value, isbn: e.target.value })}/>
                    </div>

                    
                    <div className="d-flex">
                        <button className='btn btn-success'>Update</button>
                        <button className='btn btn-danger ms-2' onClick={() => navigate('/')}>Cancel</button>
                    </div>
             </form>
        </div>
    </div>
  )
}
