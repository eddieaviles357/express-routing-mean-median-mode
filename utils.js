const ExpressError = require('./expressError');

const isQueryValid = query => ((query.hasOwnProperty('nums') && query['nums'].length > 0)) ? true : false;

// split query string and convert to int
const convertToNumsArray = nums => {
    let numsArr = nums.split(',');
    return numsArr.map( str => { 
            if( isNaN(+str) ) throw new ExpressError(`${str} is not a number`, 400);
            return +str;
            });
    };

const getMean = num => num.reduce( (curr, nextVal) => curr + nextVal, 0) / num.length;

module.exports = {
    isQueryValid,
    convertToNumsArray,
    getMean
}