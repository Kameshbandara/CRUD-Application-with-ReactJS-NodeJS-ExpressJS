const express = require('express');
//const mysql = require('mysql2/promise');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Library',
});

app.get('/books', async (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving books');
    }
    res.json(results);
  });
});

app.post('/books', (req, res) => {
  const sql = "INSERT INTO books (`Title`, `Author`, `Genre`, `Year`, `ISBN`) VALUES (?)";
  console.log(req.body);

  const values = [
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.year,
    req.body.isbn
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding book');
    }
    return res.status(201).json(result);
  });
});

app.get('/books/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE Id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving book');
    }
    if (result.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result[0]);
  });
}); 

app.put('/books/:id', (req, res) => {
  const sql = "UPDATE books SET `Title` = ?, `Author` = ?, `Genre` = ?, `Year` = ?, `ISBN` = ? WHERE `Id` = ?";
  const values = [
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.year,
    req.body.isbn,
    req.params.id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating book');
    }
    res.json({ message: 'Book updated successfully' });
  });
});

app.delete('/delete/:id', (req, res) => {
  const sql = 'DELETE FROM books WHERE Id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting book');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Book not found');
    }
    res.json({ message: 'Book deleted successfully' });
  });
});





app.listen(5000, () => console.log('Server running on http://localhost:5000'));