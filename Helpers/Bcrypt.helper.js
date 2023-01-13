const Bcrypt = require('bcrypt')
function Hash(payload) {
    return Bcrypt.hashSync(payload, 10)
}

function Compare(plainText, hashed) {
    return Bcrypt.compareSync(plainText, hashed)
}

module.exports = {
    Hash, 
    Compare
}