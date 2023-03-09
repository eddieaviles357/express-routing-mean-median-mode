const { urlencoded } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.listen(port, () => {
    console.log(`server active at port ${port}`);
})