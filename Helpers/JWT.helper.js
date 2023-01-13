const Jwt = require('jsonwebtoken')

function Sign(payload) {
    return Jwt.sign(payload, process.env.secretKey)
}
function Verify(token) {
    return Jwt.verify(token, process.env.secretKey)
}

module.exports = {
    Sign,
    Verify
}