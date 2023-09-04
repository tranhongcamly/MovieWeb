import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


function Login({setToken}) {
    let navigate = useNavigate()
    // if(!token){
    //     return <Login setToken = {setToken}/>
    // }
        const onFinish = (values) => {
        console.log('Success:', values);
        };
        
        const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };

        // useEffect(() => {
        //     fetch("https://api.themoviedb.org/3/authentication/token/new?api_key=9b00e03c6d53581effb063d999d11128")
        //     .then(res => res.json())
        //     .then(result => {
        //         localStorage.setItem("accessToken", result.request_token)
        //         navigate("/home")
        //     })
        // }, [])

        let handleLogin = () => {
            fetch("https://api.themoviedb.org/3/authentication/token/new?api_key=9b00e03c6d53581effb063d999d11128")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setToken(result.request_token)
                // localStorage.setItem("accessToken", result.request_token)
                navigate("/")
            })
            // localStorage.setItem("accessToken", true)
            // navigate("/home")
        }
    
  return (
    <div>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleLogin}>
                Submit
            </Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Login