const {User, Product, Transaction} = require('../models')

class AdminControllers {
    static async topUp(req, res) {
        let {user_id, balance} = req.body
        try {
            const dataUser = await User.findByPk(user_id)
            balance = balance + dataUser.balance
            await User.update({balance : balance}, {where : {id : user_id}})
            return res.status(200).json({
                message : 'Balance added successfully'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async makeSeller(req, res) {
        const {sellerId} = req.params
        try {
            const validateUser = await User.findByPk(sellerId)
            if(!validateUser) return res.status(404).json({
                message : 'NOT FOUND'
            })
            await User.update({role : 'seller'}, {where : {id : sellerId}})
            return res.status(200).json({
                message : 'Update Customer To Seller'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }
}
module.exports = AdminControllers