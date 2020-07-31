const app = require('express')()
const cors = require('cors')
require('express-async-errors')

app.use(cors())

app.use(require('../middlewares/verifyToken'))

app.get('/users', (req, res) => {
    if (req.claims.level > 0) return res.send(403).send({ message: 'not authorized' })
    res.send(req.claims)
})

app.use(require('../middlewares/error'))

module.exports = app
