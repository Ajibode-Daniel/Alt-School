const http = require('http');
const fs = require ('fs');
const path = require ('path');


const booksDb = path.join(__dirname, "db" , 'books.json');

const PORT = 8900;
const HOST_NAME = "localhost";

let books = [];
try {
    const booksData = fs.readFileSync(booksDb, 'utf8');
    books = JSON.parse(booksData);
} catch (err) {
    console.error('Error reading books data:', err);
}

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/books') {
        // Return list of books
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    } else if (method === 'PUT' && url === '/books') {
        // Update books (sample implementation)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Books updated successfully');
    } else if (method === 'DELETE' && url === '/books') {
        // Delete books (sample implementation)
        books = [];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('All books deleted successfully');
    } else if (method === 'GET' && url.startsWith('/books/author/')) {
        // Get books by author (sample implementation)
        const author = url.split('/').pop();
        const authorBooks = books.filter(book => book.author === author);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(authorBooks));
    } else if (method === 'POST' && url === '/books/author/') {
        // Add new book by author (sample implementation)
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newBook = JSON.parse(body);
            books.push(newBook);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('New book added successfully');
        });
    } else if (method === 'PUT' && url.startsWith('/books/author/')) {
        // Update books by author (sample implementation)
        const author = url.split('/').pop();
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedBookData = JSON.parse(body);
            books.forEach(book => {
                if (book.author === author) {
                    book.title = updatedBookData.title || book.title;
                    book.author = updatedBookData.author || book.author;
                }
            });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Books updated successfully for author: ' + author);
        });
    } else {
        // Handle invalid endpoints
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port = 8900;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
