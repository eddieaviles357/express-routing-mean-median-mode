class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.msg = message;
        this.status = status || 500;
        console.error(this.stack);
    }
}

module.exports = ExpressError;