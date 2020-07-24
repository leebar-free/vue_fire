module.exports = (err, req, res, next) => {
    if (err.message === 'abc') {
        res.status(403);
        res.json({ error: err.message });
    }

    res.send(err.message)
}
