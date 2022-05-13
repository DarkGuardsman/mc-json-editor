const express = require('express')
const app = express()
const SERVER_PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hi, this is an image server with no functionality outside static files');
});

app.use('/static', express.static('/static/'));

app.listen(SERVER_PORT);