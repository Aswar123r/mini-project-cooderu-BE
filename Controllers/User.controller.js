const {User} = require('../models')
const {Sign} = require('../Helpers/JWT.helper')
const {Hash, Compare} = require('../Helpers/Bcrypt.helper')

class UserControllers {
    static async Register (req, res) {
        let {full_name, email, gender, phone_number, password} = req.body
        try {
            const insertUser = await User.create({full_name : full_name, email : email, gender : gender, phone_number : phone_number, password : Hash(password),
            balance : 0, role :'customer'})
            return res.status(201).json({
                message : 'Conratulations You Are Registered',
                data : {
                    full_name : insertUser.full_name,
                    email : insertUser.email,
                    gender : insertUser.gender,
                    phone_number : insertUser.phone_number
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async Login (req, res) {
        const {email, password } = req.body
        try {
            const validateEmail = await User.findOne({where : {email : email}})
            if(!validateEmail) return res.status(404).json({
                message : 'Email Not Register'
            })
            if(!Compare(password, validateEmail.password)) return res.status(404).json({
                message : 'Password Incorrect'
            })
            const generateToken = await Sign({id : validateEmail.id})
            return res.status(201).json({
                data : {
                    full_name : validateEmail.full_name,
                    email : validateEmail.email,
                    gender : validateEmail.gender,
                    phone_number : validateEmail.phone_number,
                    balance : validateEmail.balance,
                    token : generateToken
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : err
            })
        }
    }

    static async Update (req, res) {
        const {id} =req.user
        let {full_name, email, gender, phone_number} = req.body
        try {
            const updateUser = await User.update({full_name : full_name, email : email, gender : gender, phone_number : phone_number},
                {where : {id : id}})
            if(!updateUser) res.status(400).json({
                message : 'Account Data Update Failed'
            })
            return res.status(200).json({
                message : 'Data Successfully Updated'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : err
            })
        }
    }

    static async Delete (req, res) {
        const {id} = req.user
        try {
            await User.destroy({where : {id : id}})
            return res.status(201).json({
                message : 'Delete Account SuccessFull'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : err
            })
        }
    }

    static async checkBalance (req, res) {
        const {id} = req.user
        try {
            const Balance = await User.findByPk(id)
            return res.status(200).json({
                message : `Your Account Balance Is Rp.${Balance.balance}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message : err
            })
        }
    }
}

module.exports = UserControllers