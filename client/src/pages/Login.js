import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form submit handler
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/users/login', values);
            setLoading(false);
            message.success('Login Successful');
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
            navigate('/');
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
        <div className='login-page' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px' }}>
                {loading && <Spinner />}
                <Form layout='vertical' onFinish={submitHandler} style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ marginBottom: '20px' }}>Login Form</h1>
                    <Form.Item label="Email" name="email">
                        <Input type='email' style={{ borderRadius: '4px', marginBottom: '10px' }} />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' style={{ borderRadius: '4px', marginBottom: '10px' }} />
                    </Form.Item>
                    <div style={{ marginBottom: '10px' }}>
                        Don't have an account?
                        <Link to="/register" style={{ color: '#1890ff' }}>  Sign up now</Link>
                    </div>
                    <button className='logout-button' style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Login</button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
