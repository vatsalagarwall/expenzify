import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, Select, message, Table, DatePicker } from 'antd';
import Layout from '../components/Layout/Layout';
import Spinner from '../components/Spinner';
import axios from 'axios';
const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransactions, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState('7');



    useEffect(() => {
        //get all transaction
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                setLoading(true)
                const res = await axios.post('/transactions/get-transaction', { userid: user._id, frequency })
                setLoading(false)
                setAllTransaction(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
                message.error("Fetch issue");
            }
        }
        getAllTransactions();
    }, [frequency])

    // Table columns
    const columns = [{
        title: 'Date',
        dataIndex: 'date',
    }, {
        title: 'Amount',
        dataIndex: 'amount',
    }, {
        title: 'Type',
        dataIndex: 'type',
    }, {
        title: 'Category',
        dataIndex: 'category',
    }, {
        title: 'Reference',
        dataIndex: 'reference'
    }, {
        title: 'Actions',
    }];


    // Form handling
    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
            await axios.post('/transactions/add-transaction', { ...values, userid: user._id });
            setLoading(false);
            message.success("Transaction added successfully");
            setShowModal(false);
            // getAllTransactions(); // Refresh transactions list 
        } catch (error) {
            setLoading(false);
            message.error("Failed to add transaction");
        }
    };

    return (
        <Layout>
            {loading && <Spinner />}
            <div className='filters'>
                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(value) => setFrequency(value)}>
                        <Select.Option value="7">Last 7 days</Select.Option>
                        <Select.Option value="30">Last 30 days</Select.Option>
                        <Select.Option value="365">Last 1 year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>

                </div>
                <div>
                    <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</button>
                </div>
            </div>
            <div className='content'>
                <Table columns={columns} dataSource={allTransactions} />
            </div>
            <Modal
                title="Add transaction"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fee">Fee</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Reference" name="reference">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary'>SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    );
};

export default HomePage;
