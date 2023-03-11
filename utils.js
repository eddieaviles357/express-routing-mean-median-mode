const isQueryValid = (req) => ((req.query.hasOwnProperty('num') && req.query['num'].length > 0)) ? true : false;
module.exports = isQueryValid;