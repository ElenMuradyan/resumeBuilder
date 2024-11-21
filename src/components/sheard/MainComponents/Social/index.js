import { Form, Input, Button, Typography, theme, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSocialSection } from "../../../../state-management/slices/ResumeInfo";
import { setSavedToFalse, setSavedToTrue } from "../../../../state-management/slices/mainSlice";

const { Title } = Typography;

const SocialSection = () => {
    const { token } = theme.useToken();
    const [ form ] = Form.useForm();
    const { socialSection } = useSelector(store => store.resumeInfo.resumeData);
    const { pages } = useSelector(state => state.main);
    const dispatch = useDispatch();

    const handleFinish = (values) => {
        dispatch(setSavedToTrue('SocialSection'));
        dispatch(setSocialSection(values));
        notification.success({
            message: 'Data sent successfully:)',
        });
    };

    const onChange = () => {
        if(pages.SocialSection.saved === true){
            dispatch(setSavedToFalse('SocialSection'));
        }
    };

    return(
        <>
            <Title style={{color: token.blue, textAlign: 'center'}}>Add your Social Links</Title>
            <Form form={form} onFinish={handleFinish} onFieldsChange={onChange} layout="vertical" style={{padding: '3%'}}>
                <Form.Item
                className="formItem"
                name='instagram'
                label='Instagram Link'
                initialValue={socialSection.instagram}
                rules={[{
                    required: true,
                    message: 'Enter your Instagram link!'
                }]}
                >
                    <Input className="Input" placeholder='Instagram Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                className="formItem"
                name='facebook'
                label='Facebook Link'
                initialValue={socialSection.facebook}
                rules={[{
                    required: true,
                    message: 'Enter your Facebook link!'
                }]}
                >
                    <Input className="Input" placeholder='Facebook Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                className="formItem"
                name='twitter'
                label='Twitter Link'
                initialValue={socialSection.twitter}
                rules={[{
                    required: true,
                    message: 'Enter your Twitter link!'
                }]}
                >
                    <Input className="Input" placeholder='Twitter Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                className="formItem"
                name='linkedin'
                label='LinkedIn Link'
                initialValue={socialSection.linkedin}
                rules={[{
                    required: true,
                    message: 'Enter your LinkedIn link!'
                }]}
                >
                    <Input className="Input" placeholder='LinkedIn Link' type='text'></Input>
                </Form.Item>
                <Button size="large" htmlType='submit' type='primary'>Save</Button>
                <Title level={3} style={{color:'rgba(0, 136, 255, 0.7)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </>
    )
};

export default SocialSection;