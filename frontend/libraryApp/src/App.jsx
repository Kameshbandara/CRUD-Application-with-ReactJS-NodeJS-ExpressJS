import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddBook from './components/Addbook';
import Edit from './components/Edit';
import Home from './components/home';
import Read from './components/Read';

function App() {
  return (
    <BrowserRouter>
      <div className='w-full overflow-hidden'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook/>} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

