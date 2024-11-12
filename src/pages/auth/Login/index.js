import { Input, Form, Button, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;

const Login = () => {
    const [ form ] = Form.useForm();

    const handleLogin = () => {

    }

    return (
        <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
            label='Email'
            name='email'
            rules={[{
                required: true,
                message: 'Enter your email!'
            }]}
            >
                <Input placeholder="Enter your email" type="email"/>
            </Form.Item>
            <Form.Item
            label='Password'
            name='password'
            rules={[{
                required: true,
                message: 'Enter your password!'
            },
            {
                message: 'Wrong password'
            }
            ]}
            >
                <Input.Password placeholder="Enter the Password"/>
            </Form.Item>
            <Button>Sign in</Button>
            <Title level={4}>Don't have an account?</Title>
            <Link>Sign up</Link>
        </Form>
    )
}

export default Login;