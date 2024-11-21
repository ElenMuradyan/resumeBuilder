import { Input, Form, Button, Typography, notification } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useDispatch } from "react-redux";
import { fetchUserProfileInfo, setIsAuth } from "../../../state-management/slices/userProfile";
import Wrapper from "../../../components/sheard/AuthWrapper";

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ form ] = Form.useForm();

    useEffect(() => {
        navigate(ROUTE_CONSTANTS.LOGIN);
    },[navigate]);

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
        <Wrapper title='Sign in' height='100vh'>
            <Form form={form} layout="vertical" onFinish={handleLogin}>
                <Form.Item
                className="formItem"
                label='Email'
                name='email'
                rules={[{
                    required: true,
                    message: 'Enter your email!'
                }]}
                >
                    <Input className="Input" placeholder="Enter your email" type="email"/>
                </Form.Item>
                <Form.Item
                className="formItem"
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
                    <Input.Password className="Input" placeholder="Enter the Password"/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Sign in</Button>
                <Title level={4} style={{color: 'rgba(0, 60, 255, 0.64)'}}>Don't have an account?</Title>
                <Link to={ROUTE_CONSTANTS.REGISTER}>Sign up</Link>
        </Form>
        </Wrapper>
    )
}

export default Login;