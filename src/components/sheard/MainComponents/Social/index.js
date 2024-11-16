import { Form, Input, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSocialSection } from "../../../../state-management/slices/ResumeInfo";

const { Title } = Typography;

const SocialSection = () => {
    const { socialSection } = useSelector(store => store.resumeInfo.resumeData);
    const dispatch = useDispatch();

    const handleChange = (values) => {
        dispatch(setSocialSection(values));
    };

    return(
        <>
            <Title>Add your Social Links</Title>
            <Form onFinish={handleChange} initialValues={socialSection} vertical>
                <Form.Item
                name='instagram'
                label='Instagram Link'
                rules={[{
                    required: true,
                    message: 'Enter your Instagram link!'
                }]}
                >
                    <Input placeholder='Instagram Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                name='facebook'
                label='Facebook Link'
                rules={[{
                    required: true,
                    message: 'Enter your Facebook link!'
                }]}
                >
                    <Input placeholder='Facebook Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                name='twitter'
                label='Twitter Link'
                rules={[{
                    required: true,
                    message: 'Enter your Twitter link!'
                }]}
                >
                    <Input placeholder='Twitter Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                name='linkedin'
                label='LinkedIn Link'
                rules={[{
                    required: true,
                    message: 'Enter your LinkedIn link!'
                }]}
                >
                    <Input placeholder='LinkedIn Link' type='text'></Input>
                </Form.Item>
                <Button htmlType='submit' type='primary'>Save</Button>
                <Title level={5} style={{color:'rgba(0, 136, 255, 0.487)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </>
    )
};

export default SocialSection;