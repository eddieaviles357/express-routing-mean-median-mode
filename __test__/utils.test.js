const {
    queryToNumsArr, 
    getMean, 
    getMedian, 
    getMode, 
    isQueryValid, 
    convertToNumsArray} = require('../utils');

describe('utils test', function() {
    let query;
    let numArr;
    beforeEach(function() {
        query = {nums: '1,3,5,7,9,1' };
        numArr = [1,2,3,3,4];
    });
    afterEach(function() {
        query = null;
    })

    test('is the query valid', function() {
        expect(isQueryValid(query)).toBe(true);
        expect(isQueryValid({num: ''})).toBe(false);
        expect(isQueryValid({nums: ''})).toBe(false);
    });

    test('convert string object to a number Array', function() {
        expect(convertToNumsArray(query['nums'])).toBeInstanceOf(Array);
        expect(convertToNumsArray(query['nums'])[0]).toBe(1);
        expect(typeof convertToNumsArray(query['nums'])[0]).toBe('number');
    });
    
    test('convert query to an Array', function() {
        expect(queryToNumsArr(query, query['nums'])).toBeInstanceOf(Array);
        expect(convertToNumsArray(query['nums'])[0]).toBe(1);
        expect(typeof convertToNumsArray(query['nums'])[0]).toBe('number');
    });

    test('get mean (average)', function() {
        expect(getMean(numArr)).toBe(2.6);
        expect(getMean([1,9])).toBe(5);
    });

    test('get median', function() {
        expect(getMedian(numArr)).toBe(3);
        expect(getMedian([1,5,8])).toBe(5);
    });

    test('get mode', function() {
        console.log(getMode(numArr))
        expect(getMode(numArr)).toBe(3);
        expect(typeof getMode(numArr)).toBe('number');
        expect(getMode([1,1,2,3])).toBe(1);
    });
}); 