import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {

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
            const response = await axios.post('http://localhost:5000/books', value);
            console.log('Book added successfully:', response.data);
            setValue({ title: '', author: '', genre: '', year: '', isbn: '' });
            navigate('/');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ backgroundColor: 'purple' }}>
 
        <div className='w-50 bg-white rounded p-3'> 
            <form onSubmit={handleSubmit}>
                <h2>Add Books</h2> 

                    <div className='mb-2'>
                        <label htmlFor="title">Title</label> 
                        <input type="text" id="title" placeholder='Title' className='form-control' required
                        onChange={(e) => setValue({ ...value, title: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="author">Author</label>  
                        <input type="text" id="author" placeholder='Author' className='form-control' required
                        onChange={(e) => setValue({ ...value, author: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="genre">Genre</label>  
                        <input type="text" id="genre" placeholder='Genre' className='form-control' required
                        onChange={(e) => setValue({ ...value, genre: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="year">Year</label>  
                        <input type="number" id="year" placeholder='Year' className='form-control' required
                        onChange={(e) => setValue({ ...value, year: e.target.value })}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="isbn">ISBN</label>  
                        <input type="text" id="isbn" placeholder='ISBN' className='form-control' required
                        onChange={(e) => setValue({ ...value, isbn: e.target.value })}/>
                    </div>

                    
                    <div className="d-flex">
                        <button className='btn btn-success'>Submit</button>
                        <button className='btn btn-danger ms-2' onClick={() => navigate('/')}>Cancel</button>
                        
                        
                    </div>
             </form>
        </div>
    </div>

  )
}
