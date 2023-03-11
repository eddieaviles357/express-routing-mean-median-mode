
// nodemon --inspect 
const express = require('express');
const ExpressError = require('./expressError');
const {isQueryValid, convertToNumsArray, getMean} = require('./utils');

const app = express();
const port = 3000;

app.use(express.json());

// average number of n ( mean )
app.get('/mean', (req, res, next) => {
    let query = req.query;
    try {
        if( !(isQueryValid(query)) ) throw new ExpressError('nums are required', 400);
        let {nums} = query;
        nums = convertToNumsArray(nums);
        let mean = getMean(nums);
        return res.status(200).json( {response: {  operation: "mean", value: mean }} );
    } catch (err) {
        return next(err);
    };
});

// midpoint
// app.get('/median', (req, res) => {
//     try {
//         if(!(isQueryValid(req))) throw new ExpressError('nums are required', 400);
//     } catch (err) {
//         return next(err);
//     }
//     res.send('<h1>median route')
// });

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