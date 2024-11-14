import { Form, Input, Typography, Flex, Col, Button } from "antd";
import { PhoneNumberValidation } from "../../../../core/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setProfileSection } from "../../../../state-management/slices/ResumeInfo";
import { saveProfileToFirestore } from "../../../../core/functions/createResume";
const { Title } = Typography;

const ProfileSection = () => {
    const [ form ] = Form.useForm();
    const { resumeData: { profileSection }, resumeId } = useSelector(store => store.resumeInfo);
    const { userProfileInfo: { userData } } = useSelector(store => store.userProfile);
    const dispatch = useDispatch();

    const handleData = async values => {
        dispatch(setProfileSection(values));

        try {
            await saveProfileToFirestore(userData.uid, resumeId, 'profileSection' ,values);
        } catch (error) {
            console.error('Error saving profile to Firestore:', error);
        }
    };

    return(
        <>
        <Title>Add your profile details</Title>
        <Form 
        form={form}
        onFinish={handleData}
        initialValues={profileSection}
        style={{width: '100%', padding: '3%'}}> 
            <Flex justify='space-between'>
                <Col style={{width: '48%'}}>
                    <Form.Item
                name='firstName'
                rules={[{
                    required: true,
                    message: 'Please enter your first name'
                }]}
                >
                    <Input placeholder="First Name" type='text'></Input>
                </Form.Item>
                </Col>

                <Col style={{width: '48%'}}>
                    <Form.Item
                name='lastName'
                rules={[{
                    required: true,
                    message: 'Please enter your last name'
                }]}
                >
                    <Input placeholder="Last Name" type='text'></Input>
                </Form.Item>
                </Col>
            </Flex>
            <Flex justify='space-between'>
            <Col style={{width: '48%'}}>
            <Form.Item
                name='phoneNumber'
                rules={[{
                    required: true,
                    message: 'Please enter your phone number',
                },
                {
                    validator: PhoneNumberValidation,
                }
                ]}
                >
                    <Input placeholder="Phone Number" type='text'></Input>
                </Form.Item>
                </Col>

                <Col style={{width: '48%'}}>
                    <Form.Item
                name='adress'
                rules={[{
                    required: true,
                    message: 'Please enter your adress'
                }]}
                >
                    <Input placeholder="Adress" type='text'></Input>
                </Form.Item>
                </Col>
            </Flex>
            <Form.Item>
            </Form.Item>
            <Button type='primary' htmlType='submit'>Save and continue</Button>
            </Form>
        </>
    )
}

export default ProfileSection;