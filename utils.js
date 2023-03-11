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

const queryToNumsArr = (query, nums) => {
    if( !isQueryValid(query) ) throw new ExpressError('nums are required', 400);
    return convertToNumsArray(nums)
}

const getMean = arr => arr.reduce( (curr, nextVal) => curr + nextVal, 0) / arr.length;
const getMedian = arr => {
    let sortedArr = arr.sort((a,b) => a-b);
    if(arr.length % 2 === 1) {
        return sortedArr[ Math.floor( sortedArr.length / 2 ) ];
    } else {
        return ( sortedArr[ (sortedArr.length/2) ] + sortedArr[ (sortedArr.length/2) - 1 ]) / 2;
    }
}
module.exports = {
    queryToNumsArr,
    getMean,
    getMedian
}