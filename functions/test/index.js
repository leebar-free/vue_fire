// const express = require('express')
// const app = express

// 위에 2줄을 아래처럼 줄여서 사용 가능.
const app = require('express')()
const cors = require('cors')
require('express-async-errors')

app.use(cors())

// app.use((req, res, next) => {
//     console.log('Middle Ware ..... in')
//     console.log(JSON.stringify(req.headers))
//     throw Error('errororororor') 
//     next()
// })
app.use(require('../middlewares/verifyToken'))

app.post('/', async (req, res) => {
    // a = 3
    // if (a === 3) throw Error('abc') 
    // res.send('post ok' + a.b.c)
    res.send('post ok')
})

app.get('/', (req, res) => {
    res.send('get ok')
})

app.get('/:id', (req, res) => {
    res.send('get ok ' + req.params.id)
})

app.put('/:id', (req, res) => {
    res.send('put ok ' + req.params.id)
})

app.delete('/:id', (req, res) => {
    res.send('delete ok ' + req.params.id)
})

// app.use((err, req, res, next) => {
//     // if (err.message === 'access denied') {
//     //   res.status(403);
//     //   res.json({ error: err.message });
//     // }

//     if (err.message === 'abc') {
//         res.status(403);
//         res.json({ error: err.message });
//     }
  
//     res.send(err.message)

//     // next(err);
// })
app.use(require('../middlewares/error'))

module.exports = app
