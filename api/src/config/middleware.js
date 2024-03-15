const auth_middleware = (req, res, next) => {
    console.log('auth protection...')
    next()
}

module.exports = { auth_middleware }