const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pug = require('pug');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(express.static('public'));

let preferences = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/preferences', (req, res) => {
    res.sendFile(__dirname + '/preferences.html');
});

app.post('/submit', (req, res) => {
    const { name, surname, movie, rating } = req.body;

    // Update preferences
    if (!preferences[movie] || preferences[movie].rating < rating) {
        preferences[movie] = { name, surname, rating };
    }

    // Save preferences to file
    fs.writeFileSync('preferences.json', JSON.stringify(preferences));

    res.json({ message: 'Preferences submitted successfully!' });
});

app.get('/summary', (req, res) => {
    const movies = calculateAverageRatings();
    res.render('summary', { movies });
});

function calculateAverageRatings() {
    const movieRatings = {};
    for (const movie in preferences) {
        const rating = preferences[movie].rating;
        if (!movieRatings[movie]) {
            movieRatings[movie] = [rating];
        } else {
            movieRatings[movie].push(rating);
        }
    }

    const movies = [];
    for (const movie in movieRatings) {
        const ratings = movieRatings[movie];
        const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
        movies.push({ title: movie, averageRating });
    }

    return movies.sort((a, b) => b.averageRating - a.averageRating);
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
