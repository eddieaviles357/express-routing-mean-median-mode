const ExpressError = require('./expressError');

const isQueryValid = (query) => (query.hasOwnProperty('nums') && query['nums'].length > 0) ? true : false;

// split query string and convert to int
const convertToNumsArray = (nums) => {
    let numsArr = nums.split(',');
    return numsArr.map( (str, idx, arr) => { 
            if( isNaN(Number(str)) ) throw new ExpressError(`${arr[idx]} is not a number`, 400);
            return Number(str);
            });
    };

const queryToNumsArr = (query, nums) => {
    if( !isQueryValid(query) ) throw new ExpressError('nums are required', 400);
    return convertToNumsArray(nums);
}

const getMean = (arr) => arr.reduce((curr, nextVal) => curr + nextVal)/arr.length;

const getMedian = (arr) => {
    let sortedArr = arr.sort((a,b) => a-b);
    return (arr.length % 2 === 1) ? 
                sortedArr[ Math.floor( sortedArr.length / 2 ) ] :
                ( sortedArr[ (sortedArr.length/2) ] + sortedArr[ (sortedArr.length/2) - 1 ]) / 2;
}

const getMode = (arr) => {
    let count = 0;
    let mostFreq = 0;
    let freqArr = arr.reduce((curr, next) => {
                    curr[next] = (curr[next] || 0) + 1;
                    return curr;
                }, {});

    for (key in freqArr) {
        if (freqArr[key] > count) {
          mostFreq = key;
          count = freqArr[key];
        }
      }
      return Number(mostFreq);
}

module.exports = {
    queryToNumsArr,
    getMean,
    getMedian,
    getMode,
    isQueryValid,
    convertToNumsArray
}