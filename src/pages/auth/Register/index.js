import { Form, Input, notification, Button, Typography } from "antd"
import { regexpValidation, FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Register = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();

    const handleRegister = async values => {
        const { firstName, lastName, email, password } = values;

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            await setDoc(createDoc, {
                uid, firstName, lastName, email
            })
            form.resetFields();
            navigate(ROUTE_CONSTANTS.LOGIN);
        }catch(e){
            console.log(e)
            notification.error({
                message: 'Invalid Register Credentials'
            })
        }
    };

    return(
        <Form form={form} layout="vertical" onFinish={handleRegister}>
            <Form.Item
            label='First Name'
            name='firstName'
            rules={[{
                required:true,
                message: 'Enter your first name!'
            }]}
            >
                <Input placeholder="First Name" type="text"/>
            </Form.Item>
            <Form.Item
            label='Last Name'
            name='lastName'
            rules={[{
                required:true,
                message: 'Enter your last name!'
            }]}
            >
                <Input placeholder="Last Name" type="text"/>
            </Form.Item>
            <Form.Item
            label='Email'
            name='email'
            rules={[{
                required:true,
                message: 'Enter your email!'
            }]}
            >
                <Input placeholder="Email" type="text"/>
            </Form.Item>
            <Form.Item
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
                <Input.Password placeholder="Password" type="text"/>
            </Form.Item>
            <Button htmlType="submit">Sign up</Button>
            <Title level={4}>Already have an account?</Title>
            <Link>Sign in</Link>  {/* Todo */} 
        </Form>
    )
}

export default Register;