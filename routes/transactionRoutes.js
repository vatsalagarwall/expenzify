const express = require('express')
const { addTransaction, getAllTransactions } = require('../controllers/transactionCtrl')


//router object
const router = express.Router()



//routes
//add transactions
router.post('/add-transaction', addTransaction)




//get transactions
router.get('/get-transaction', getAllTransactions)


module.exports = router