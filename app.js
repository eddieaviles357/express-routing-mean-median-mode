
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
app.get('/median', (req, res) => {
    let query = req.query;
    try {
        let nums = queryToNumsArr(query, query['nums']);
        let median = getMedian(nums);
        return res.status(200).json( {response: { operation: "median", value: median}})
    } catch (err) {
        return next(err);
    };
});

// most frequent
app.get('/mode', (req, res) => {
    let query = req.query;
    try {
        let nums = queryToNumsArr(query, query['nums']);
        let mode = getMode(nums);
        return res.status(200).json( {response: { operation: "mode", value: mode}})
    } catch (err) {
        return next(err);
    };
});
 
app.use((err, req, res, next) => {
    if(err instanceof TypeError) console.error('Unable to convert string');
    if(err instanceof ExpressError) console.error(`\n\nERROR:MESSAGE: ${err.msg}\nSTATUS:CODE:${err.status}`);
    return res.status(err.status).send(err.msg)
}) 

app.listen(port, () => {
    console.log(`server active at port ${port}`);
})