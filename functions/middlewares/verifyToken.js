module.exports =(req, res, next) => {
    console.log('Middle Ware ..... in2..js')
    console.log(JSON.stringify(req.headers))
    // throw Error('errororororor') 
    next()
}
