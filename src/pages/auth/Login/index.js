import { Input, Form, Button, Typography, notification } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useDispatch } from "react-redux";
import { fetchUserProfileInfo, setIsAuth } from "../../../state-management/slices/userProfile";

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ form ] = Form.useForm();

    useEffect(() => {
        navigate(ROUTE_CONSTANTS.LOGIN);
    },[]);

    const handleLogin = async values => {
        try{
            const { email, password } = values;
            await signInWithEmailAndPassword(auth, email, password);
            form.resetFields();
            navigate(ROUTE_CONSTANTS.WELCOMEPAGE);
            dispatch(setIsAuth(true));
            dispatch(fetchUserProfileInfo());
        }catch{
            notification.error({
                message:'Invalid Login Credentials', 
            })
        }
    };

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
            <Button htmlType="submit">Sign in</Button>
            <Title level={4}>Don't have an account?</Title>
            <Link to={ROUTE_CONSTANTS.REGISTER}>Sign up</Link>
        </Form>
    )
}

export default Login;