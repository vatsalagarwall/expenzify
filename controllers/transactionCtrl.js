const transactionModel = require("../models/transactionModel")
const moment = require('moment')

const getAllTransactions = async (req, res) => {
    try {
        const { frequency } = req.body
        const transactions = await transactionModel.find({
            date: {
                $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
            userid: req.body.userid
        })

        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction Created')

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};


module.exports = { getAllTransactions, addTransaction };