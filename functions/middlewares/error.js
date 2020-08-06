module.exports = (err, req, res, next) => {
    if (err.message === 'abc') {
        res.status(403);
        res.json({ error: err.message });
    }

    res.status(500).send(err.message)
}
