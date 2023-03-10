
// nodemon --inspect 
const express = require('express');
const ExpressError = require('./expressError');

const app = express();
const port = 3000;

app.use(express.json());

// average number of n ( mean )
app.get('/mean', (req, res, next) => {
    try {
        let operation = "mean";
        // split query string and convert to int
        let {num} = req.query
        num = num
            .split(',')
            .map( str => { 
                if( isNaN(+str) ) throw new ExpressError(`${str} is not a number`, 400);
                return +str;
            });
        let value = num.reduce( (curr, nextVal) => curr + nextVal, 0) / num.length;
        return res.status(200).json( {response: {  operation, value }} );
    } catch (err) {
        return next(err);
    };
});

// midpoint
app.get('/median', (req, res) => {
    res.send('<h1>median route')
});

// most frequent
// app.get('/mode', (req, res) => {
//     res.send('<h1>median route')
// });
 
app.use((err, req, res, next) => {
    if(err instanceof TypeError) console.error('Unable to convert string');
    if(err instanceof ExpressError) console.error(`\n\nERROR:MESSAGE: ${err.msg}\nSTATUS:CODE:${err.status}`);
    return res.status(err.status).send(err.msg)
}) 

app.listen(port, () => {
    console.log(`server active at port ${port}`);
})