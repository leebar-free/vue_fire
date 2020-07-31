const admin = require('firebase-admin');

module.exports =(req, res, next) => {
    console.log('Middle Ware ..... in2..js')
    console.log(JSON.stringify(req.headers))
    // throw Error('errororororor') 

    // idToken comes from the client app
    admin.auth().verifyIdToken(req.headers.authorization)
        .then(function(decodedToken) {
            req.claims = decodedToken
            next()
        }).catch(function(e) {
            console.error(e.message)
            res.status(401).send()
        });
    // next()
}
