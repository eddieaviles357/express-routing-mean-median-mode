
// nodemon --inspect 
const express = require('express');
const ExpressError = require('./expressError');
const {queryToNumsArr, getMean, getMedian, getMode} = require('./utils');

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
app.get('/median', (req, res, next) => {
    let query = req.query;
    try {
        let median = getMedian(queryToNumsArr(query, query['nums']));
        return res.status(200).json( {response: { operation: "median", value: median}})
    } catch (err) {
        return next(err);
    };
});

// most frequent
app.get('/mode', (req, res, next) => {
    let query = req.query;
    try {
        let mode = getMode(queryToNumsArr(query, query['nums']));
        return res.status(200).json( {response: { operation: "mode", value: mode}})
    } catch (err) {
        return next(err);
    };
});
 
app.use((err, req, res, next) => {
    let errMsg = `\n\nERROR:MESSAGE: ${err.msg}\nSTATUS:CODE:${err.status}`;

    if (err instanceof TypeError) console.error(errMsg);
    if (err instanceof ExpressError) console.error(errMsg);
    return res.status(err.status).send(err.msg);
}) 

app.listen(port, () => {
    console.log(`server active at port ${port}`);
})