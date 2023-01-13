
const {Transaction, User, Product} = require('../models')
//const validatePrduct = require('../Validations/Product.validation')
class TransactionControllers {
    static async create (req, res) {
        const {quantity, product_id} = req.body
        const {id} = req.user
            try {
                const validatePrduct = await Product.findOne({where : {id : product_id}})
                if(!validatePrduct) {
                   return  res.status(404).json({
                    message : 'NOT FOUND PRODUCT'
                })
            }
                if(validatePrduct.stock < quantity) {
                    return res.status(404).json({
                    message : 'Insufficient product'
                })
            }
                const dataCustomer = await User.findByPk(id)
                const dataSeller = await User.findByPk(validatePrduct.user_id)
                console.log(quantity * validatePrduct.price)
                if(dataCustomer.balance < (quantity * validatePrduct.price)) return res.status(404).json({
                    message : 'The balance is not sufficient'
                })
                const totalPrice = quantity * validatePrduct.price
                const balanceUser = dataCustomer.balance - totalPrice
                await User.update({balance : balanceUser}, {where : {id : id}})
                const Transactions = await Transaction.create({quantity : quantity, product_id : product_id, total_price : totalPrice, user_id : id})
                await Product.update({stock : validatePrduct.stock - quantity, sold : validatePrduct.sold + quantity}, {where : {id : product_id}})
                await User.update({balance : totalPrice + dataSeller.balance}, {where : {id : dataSeller.id}})
                const dataTransaction = await Transaction.findByPk(Transactions.id)
                if (dataTransaction) {
                    return res.status(200).json({
                    message : 'Successful transaction',
                    data : dataTransaction
                })
                }
            }  catch (err) {
                console.log(err)
                return res.status(500).json({
                    message : 'INTERAL SERVER ERROR'
                })
            }
    }
}

module.exports = TransactionControllers