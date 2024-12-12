import { Form, Input, notification, Button, Typography } from "antd"
import { regexpValidation, FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../../../components/sheard/AuthWrapper";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../state-management/slices/userProfile";
const { Title } = Typography;

const Register = () => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async values => {
        const { firstName, lastName, email, password } = values;

        try{
            dispatch(setLoading(true));
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            await setDoc(createDoc, {
                uid, firstName, lastName, email
            })
            form.resetFields();
            navigate(ROUTE_CONSTANTS.LOGIN);
        }catch{
            notification.error({
                message: 'Invalid Register Credentials'
            })
        }finally{
            dispatch(setLoading(false))
        }
    };
    return(
        <Wrapper title='Sign up' height='100vh'>
        <Form form={form} layout="vertical" onFinish={handleRegister}>
            <Form.Item
            className="formItem"
            label='First Name'
            name='firstName'
            rules={[{
                required:true,
                message: 'Enter your first name!'
            }]}
            >
                <Input className="Input" placeholder="First Name" type="text"/>
            </Form.Item>
            <Form.Item
            className="formItem"
            label='Last Name'
            name='lastName'
            rules={[{
                required:true,
                message: 'Enter your last name!'
            }]}
            >
                <Input className="Input" placeholder="Last Name" type="text"/>
            </Form.Item>
            <Form.Item
            className="formItem"
            label='Email'
            name='email'
            rules={[{
                required:true,
                message: 'Enter your email!'
            }]}
            >
                <Input className="Input" placeholder="Email" type="text"/>
            </Form.Item>
            <Form.Item
            className="formItem"
            label='Password'
            name='password'
            tooltip={'The password must contain at least 6 to 16 characters, including at least one digit and one special character (e.g., !, @, #, $, %, ^, &, *).'}
            rules={[{
                required:true,
                message:'Enter the password'
            },
            {
                pattern:regexpValidation,
                message:'Too simple password'
            }
            ]}
            >
                <Input.Password className="Input" placeholder="Password" type="text"/>
            </Form.Item>
            <Button htmlType="submit" type='primary'>Sign up</Button>
            <Title style={{color: 'rgba(0, 60, 255, 0.64)'}} level={4}>Already have an account?</Title>
            <Link to={ROUTE_CONSTANTS.LOGIN}>Sign in</Link>  
        </Form>
        </Wrapper>
    )
}

export default Register;