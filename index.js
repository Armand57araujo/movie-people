const express = require ('express');
const mysql = require ('mysql2');



const PORT = process.env.PORT || 3001;
const app = express();


const db = mysql.createConnection(
    
    {

    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'movies_db'

},
console.log(`Connected to the movies database.`)
);

app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) throw err;
        res.json(results);

    });
});

app.get('/api/movies-reviews', (req, res) => {
    db.query('SELECT * FROM reviews.review, movies.name FROM reviews JOIN movies ON reviews.movie_id = movies.id', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/add-movie', (req, res) => {
    db.query('INSERT INTO movies (name) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.send('Movie added successfully');
    });
});

// app.post('/api/review/:id', (req, res) => {
//     const { id } = req.params;
//     const {review} = req.body;
//     db.query('UPDATE reviews SET review = ? WHERE id = ?', [review, id], (err, results) => {
//                 if (err) throw err;
//                 res.send('Review updated successfully');
//     });
// });

app.put('/api/review/:id', (req, res) => {
    const { id } = req.params;
    const {review} = req.body;
    db.query('UPDATE reviews SET review = ? WHERE id = ?', [review, id], (err, results) => {
        if (err) throw err;
        res.send('Review updated successfully');
    });
});

app.delete('/api/movie/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM movie WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send('Movie deleted successfully');
    });
});


















app.listen(port, ()=> {

    console.log(`Server running at http:localhost:${port}`)
})
