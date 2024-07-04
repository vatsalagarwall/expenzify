const express = require('express')
const { addTransaction, getAllTransactions, editTransaction } = require('../controllers/transactionCtrl')


//router object
const router = express.Router()



//routes
//add transactions
router.post('/add-transaction', addTransaction)

//edit transactions
router.post('/edit-transaction', editTransaction)




//get transactions
router.post('/get-transaction', getAllTransactions)


module.exports = router