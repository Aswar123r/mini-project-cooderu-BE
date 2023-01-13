const {User} = require('../models')
async function adminAutorisation (req, res, next){
   try {
    const {id} = req.user
    const validateAdmin  = await User.findOne({where : {id : id, role : 'admin'}})
    if(!validateAdmin) return res.status(303).json({
      message : 'Accesss is prohibited'
    })
    next()
   } catch (err) {
    return res.status(500).json(`${err.message}. Please try again`)
   }
}

module.exports = adminAutorisation