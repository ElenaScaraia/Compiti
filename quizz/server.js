const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

let students = [];

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// Pagina di inserimento dati per il quiz
app.get('/quiz', (req, res) => {
    res.render('quiz');
});

// Ricezione dei dati del quiz e calcolo del punteggio
app.post('/submit', (req, res) => {
    const { name, surname, q1, q2, q3 } = req.body;
    const score = calculateScore(q1, q2, q3);

    students.push({ name, surname, score });

    // Salva su file
    fs.writeFileSync('students.json', JSON.stringify(students));

    // Reindirizza alla pagina di riepilogo
    res.redirect('/summary');
});

// Pagina di riepilogo dei quiz
app.get('/summary', (req, res) => {
    // Ordina gli studenti per punteggio decrescente
    students.sort((a, b) => b.score - a.score);
    res.render('summary', { students });
});

// Funzione per calcolare il punteggio del quiz
function calculateScore(q1, q2, q3) {
    let score = 0;
    if (q1 === "12-15 anni") score += 1.5;
    if (q2 === "Maine Coon") score += 1.5;
    if (q3 === "Sphynx") score += 1.5;
    return score;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
