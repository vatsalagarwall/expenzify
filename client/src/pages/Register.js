import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form submit handler
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('/users/register', values);
            message.success('Registration Successful');
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong');
        }
    };

    // Prevent auto-login if user is already logged in
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='register-page' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px' }}>
                {loading && <Spinner />}
                <Form layout='vertical' onFinish={submitHandler} style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ marginBottom: '20px' }}>Register Form</h1>
                    <Form.Item label="Name" name="name">
                        <Input style={{ borderRadius: '4px', marginBottom: '10px' }} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type='email' style={{ borderRadius: '4px', marginBottom: '10px' }} />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' style={{ borderRadius: '4px', marginBottom: '10px' }} />
                    </Form.Item>
                    <div style={{ marginBottom: '10px' }}>
                        Already have an account?
                        <Link to="/login" style={{ color: '#1890ff' }}>  Click here to login</Link>
                    </div>
                    <button className='logout-button' style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Register</button>
                </Form>
            </div>
        </div>
    );
};

export default Register;
