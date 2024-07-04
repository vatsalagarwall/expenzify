import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, Select, message, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout';
import Spinner from '../components/Spinner';
import axios from 'axios';
import moment from 'moment'
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransactions, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all')
    const [viewData, setViewData] = useState("table");
    const [editable, setEditable] = useState(null);



    // Table columns
    const columns = [{
        title: 'Date',
        dataIndex: 'date',
        render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
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
        render: (text, record) => (
            <div>
                <svg
                    style={{ cursor: 'pointer' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                    onClick={() => {
                        setEditable(record);
                        setShowModal(true);
                    }}
                >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                </svg>

                {/* <EditOutlined onClick={() => {
                    setEditable(record)
                    setShowModal(true)
                }} /> */}
                <svg
                    style={{ cursor: 'pointer', marginLeft: '18px' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2"
                    onClick={() => handleDelete(record)}
                >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                </svg>

                {/* <DeleteOutlined className='mx-2' onClick={() => handleDelete(record)} /> */}

            </div>
        )
    }];

    useEffect(() => {
        //get all transaction
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setLoading(true);
                const res = await axios.post('/transactions/get-transaction', {
                    userid: user._id, frequency, selectedDate, type
                });
                setLoading(false)
                setAllTransaction(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
                message.error("Fetch issue");
            }
        }
        getAllTransactions();
    }, [frequency, selectedDate, type])


    //delete handler
    const handleDelete = async (record) => {
        try {
            setLoading(true)
            await axios.post("/transactions/delete-transaction", { transactionId: record._id })
            setLoading(false)
            message.success("Transaction Deleted")
        } catch (error) {
            setLoading(false)
            console.log(error)
            message.error("Unable To Delete")
        }
    }


    // Form handling
    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
            if (editable) {
                await axios.post('/transactions/edit-transaction', {
                    payload: {
                        ...values,
                        userId: user._id
                    },
                    transactionId: editable._id
                });
                setLoading(false);
                message.success("Transaction updated successfully");
            } else {
                await axios.post('/transactions/add-transaction', { ...values, userid: user._id });
                setLoading(false);
                message.success("Transaction added successfully");
            }
            setShowModal(false);
            setEditable(null)
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
                    <Select value={frequency} onChange={(value) => setFrequency(value)} style={{ width: "130px" }}>
                        <Select.Option value="7">Last 7 days</Select.Option>
                        <Select.Option value="30">Last 30 days</Select.Option>
                        <Select.Option value="365">Last 1 year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {
                        frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />
                    }

                </div>

                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)} style={{ width: "100px" }}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                    {
                        frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />
                    }

                </div>

                <div className='switch-icons'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"
                        }`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"
                        }`} onClick={() => setViewData('analytics')} />
                </div>
                <div>
                    <button
                        className="logout-button"
                        onClick={() => setShowModal(true)}
                    >
                        Add New
                    </button>
                </div>
            </div>

            <div className='content'>
                {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} /> : <Analytics allTransactions={allTransactions} />
                }
            </div>
            <Modal
                title={editable ? 'Edit Transaction' : 'Add Transaction'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
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
                        <button type='submit' className='logout-button'>SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    );
};

export default HomePage;



