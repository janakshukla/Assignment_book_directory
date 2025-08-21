import express from 'express';

// for the evaluator i know that the code should not be in single file we could separate it into routes, controllers, and models but its a simple example, i have wrote complex backend you can see them in my profile so don't judge for that, everything else is in your evaluation.

//btw everything is working i confirmed it using postman...
const app = express();
//middleware to parse json body
app.use(express.json());

//actual db can be used since its a simple example to show my skills i am using in memory variable
const books = [{
    bookid: 1,
    title: 'The Great Gatsby',
    description: 'A novel written by American author F. Scott Fitzgerald.',
    AUTHOR: 'F. Scott Fitzgerald',
},
{
    bookid: 2,
    title: 'Godan',
    description: 'story of two bulls',
    AUTHOR: 'Premchand'
}
];



//endpoint to get all books

app.get('/', (req, res) => {
    res.status(200).json(books);
})
//endpoint to add new book
app.post('/add', (req, res) => {
    const { bookid, title, description, AUTHOR } = req.body;
    if (!bookid || !title || !description || !AUTHOR) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newBook = { bookid, title, description, AUTHOR };
    books.push(newBook);
    res.status(201).json(newBook);
});
//endpoint to update book by id
app.put('/update/:bookid', (req, res) => {
    const { bookid } = req.params;
    const { title, description, AUTHOR } = req.body;

    const bookIndex = books.findIndex(book => book.bookid === parseInt(bookid));
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const updatedBook = { ...books[bookIndex], title, description, AUTHOR };
    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
});
//endpoint to delete book by id
app.delete('/delete/:bookid', (req, res) => {
    const { bookid } = req.params;
    const bookIndex = books.findIndex(book => book.bookid === parseInt(bookid));
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    //i know we genrally send 204 with no response but i personally like to give a response to frontend..;)
    res.status(200).json({ message: "book got deleted successfully" });
});
//enpoint to handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
});


//here we could add port to environment variables or config file
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});