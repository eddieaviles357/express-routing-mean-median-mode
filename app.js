const { urlencoded } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/mean', (req, res) => {
    res.send('<h1>mean route</h1>')
});

app.get('/median', (req, res) => {
    res.send('<h1>median route')
});

app.get('/mode', (req, res) => {
    res.send('<h1>median route')
});

app.listen(port, () => {
    console.log(`server active at port ${port}`);
})