const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/test'
mongoose.connect(url)

const Account = mongoose.model('Account', {
    name: String,
    balance: Number
})

module.exports = {
    getAccounts(req, res) {
        let op = ''
        Account.find({}, (err, docs) => {
            if (err) op = err
            op = docs
            res.status(200).send(op)
        })    
    },
    addAccount(req, res) {
        let newAccount = new Account(req.body)
        let op = ''
        newAccount.save((err, result) => {
            if (err) op = err
            op = newAccount._id
            res.status(201).send(op)
        })
    },
    updateAccount(req, res) {
        let op = ''
        Account.findById({_id: req.params.id}, (err, account) => {
            if (err) { op = err 
            } else { 
            account.name = req.body.name ? req.body.name : account.name
            account.balance = req.body.balance ? req.body.balance : account.balance
            account.save((err, result) => {
                if (err) op = err
                op = result
            })
        }
        res.status(200).send(op)
        })        
    },
    removeAccount(req, res) {
        let op = ''
        Account.remove({_id: req.params.id}, (err) => {
            if (err) op = err
            res.status(204).send(op)
        })
    }
  }