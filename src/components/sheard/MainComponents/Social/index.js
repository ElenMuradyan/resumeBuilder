import { Form, Input, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSocialSection } from "../../../../state-management/slices/ResumeInfo";
import { setSavedToFalse, setSavedToTrue } from "../../../../state-management/slices/mainSlice";
import { useEffect } from "react";
const { Title } = Typography;

const SocialSection = () => {
    const [ form ] = Form.useForm();
    const { socialSection } = useSelector(store => store.resumeInfo.resumeData);
    const { pages } = useSelector(state => state.main);
    const dispatch = useDispatch();

    const handleFinish = (values) => {
        dispatch(setSavedToTrue('SocialSection'));
        dispatch(setSocialSection(values));
    };

    const onChange = () => {
        if(pages.SocialSection.saved === true){
            dispatch(setSavedToFalse('SocialSection'));
        }
    };

    return(
        <>
            <Title>Add your Social Links</Title>
            <Form form={form} onFinish={handleFinish} onFieldsChange={onChange} vertical>
                <Form.Item
                name='instagram'
                label='Instagram Link'
                initialValue={socialSection.instagram}
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
                initialValue={socialSection.facebook}
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
                initialValue={socialSection.twitter}
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
                initialValue={socialSection.linkedin}
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