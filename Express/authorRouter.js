const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');
    res.json(author);
});

router.post('/', (req, res) => {
    const newAuthor = {
        id: authors.length + 1,
        name: req.body.name,
        books: req.body.books
    };
    authors.push(newAuthor);
    res.json(newAuthor);
});

router.put('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');

    author.name = req.body.name;
    author.books = req.body.books;

    res.json(author);
});

router.delete('/:id', (req, res) => {
    const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (authorIndex === -1) return res.status(404).send('Author not found');

    authors.splice(authorIndex, 1);
    res.send('Author deleted successfully');
});

module.exports = router;
