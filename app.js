
// nodemon --inspect 
const express = require('express');
const ExpressError = require('./expressError');
const {queryToNumsArr, getMean} = require('./utils');

const app = express();
const port = 3000;

app.use(express.json());

// average number of n ( mean )
app.get('/mean', (req, res, next) => {
    let query = req.query;
    try {
        let mean = getMean(queryToNumsArr(query, query['nums']));
        return res.status(200).json( {response: {  operation: "mean", value: mean }} );
    } catch (err) {
        return next(err);
    };
});

// midpoint
app.get('/median', (req, res) => {
    let query = req.query;
    try {
        if( !(isQueryValid(query)) ) throw new ExpressError('nums are required', 400);

    } catch (err) {
        return next(err);
    };
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