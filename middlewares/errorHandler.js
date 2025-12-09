module.exports = (err, req, res, next) => {
    console.error(err); 

    const status = err.status || 500; // 4xx or 5xx
    const code = err.code || (status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST');
    const message = err.message || 'An unexpected error occurred';
    const details = err.details || {};

    res.status(status).json({
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        status,
        code,
        message,
        details
    });
};
