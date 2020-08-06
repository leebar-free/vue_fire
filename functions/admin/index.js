const app = require('express')()
const cors = require('cors')
const admin = require('firebase-admin');
require('express-async-errors')

const db = admin.firestore()

// app.use(cors())
app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))

app.use( (req, res, next) => {
    if (req.claims.level > 0) return res.send(403).send({ message: 'not authorized' })
    next()
})

app.get('/users', async (req, res) => {
    if (req.claims.level > 0) return res.send(403).send({ message: 'not authorized' })
    const { offset, limit, order, sort, search } = req.query
    console.log( req.query )
    offset1 = Number(offset)
    limit1 = Number(limit)
    // console.log(offset1)
    // console.log(limit1)

    const r = {
        items: [],
        totalCount: 0
    }
    // console.log( q )
    // const t = await db.collection('infos').doc('users').get()
    // r.totalCount = t.data().counter
    // console.log("totalCount :", r.totalCount)

    let s = null
    if (search) {
        s = await db.collection('users').where('email', '==', search).get()
        r.totalCount = s.size
    } else {
        const t = await db.collection('infos').doc('users').get()
        r.totalCount = t.data().counter
        s = await db.collection('users').orderBy(order, sort).offset(offset1).limit(limit1).get()
    }

    // const s = await db.collection('users').get()
    // const s = await db.collection('users').offset(offset1).limit(limit1).get()
    // const s = await db.collection('users').orderBy(order, sort).offset(offset1).limit(limit1).get()
    s.forEach(v => r.items.push(v.data()))
    res.send(r)
})

app.get('/search', async (req, res) => {
    const r = await db.collection('users').where('email', '>=', req.query.search).limit(5).get()

    const items = []
    r.forEach(v => {
        items.push(v.data().email)
    })
    res.send(items)
})

app.use(require('../middlewares/error'))

module.exports = app
