const {User} = require('../models')

async function sellerAutorisation (req, res, next){
   try {
    const {id} = req.user
    const validateSeller  = await User.findOne({where : {id : id, role : 'seller'}})
    if(!validateSeller) return res.status(303).json({
      message : 'Accesss is prohibited'
    })
    next()
   } catch (err) {
    return res.status(500).json(`${err.message}. Please try again`)
   }
}

module.exports = sellerAutorisation