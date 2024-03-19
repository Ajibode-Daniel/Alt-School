const express = require('express');
const app = express();
const authorRouter = require('./authorRouter');


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use('/authors', authorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
