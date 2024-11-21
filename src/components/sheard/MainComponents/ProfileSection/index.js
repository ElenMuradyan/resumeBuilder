import { Form, Input, Typography, Flex, Col, Button, message, notification, theme } from "antd";
import { PhoneNumberValidation } from "../../../../core/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setProfileSection } from "../../../../state-management/slices/ResumeInfo";
import { useState } from 'react';
import { storage, db } from "../../../../services/firebase";
import { STORAGE_PATH_NAMES,FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setImgUrl } from "../../../../state-management/slices/ResumeInfo";
import { doc, updateDoc } from "firebase/firestore";
import ImgUpload from "../../ImgUpload";
import { setSavedToFalse, setSavedToTrue } from "../../../../state-management/slices/mainSlice";

const { Title } = Typography;

const ProfileSection = () => {
    const { token } = theme.useToken()
    const [ uploading, setUploading ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ form ] = Form.useForm();
    const { resumeData: { profileSection, profileSection: {imgUrl} } } = useSelector(store => store.resumeInfo);
    const { resumeId } = useSelector(state => state.resumeInfo);
    const { userData: { uid } } = useSelector(store => store.userProfile.userProfileInfo);
    const { pages } = useSelector(state => state.main);
    const dispatch = useDispatch();

    const handleData = async values => {
        if(imgUrl){
            dispatch(setSavedToTrue('ProfileSection'));
            const valuesdata = {
                imgUrl: imgUrl,
                ...values
            };
            dispatch(setProfileSection(valuesdata));
            notification.success({
                message: 'Data sent successfully',
            })
        }else{
            notification.error({
                message: 'Upload your photo!'
            })
        }
        };

        const updateUserProfileImg = async (imgUrl) => {            
            try{
                const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
                const resumeRef = doc(userRef, FIRESTORE_PATH_NAMES.RESUMES, resumeId);

                await updateDoc(resumeRef, { 
                    profileSection: {
                        imgUrl: imgUrl
                    }
                })
            }catch(e){
                console.log(e)
                notification.error({
                    message:'Error:('
                })
            }
        }

        const handleUpload = ({file}) => {
            setUploading(true);
            const storageRef = ref(storage, `${STORAGE_PATH_NAMES.RESUME_IMAGES}/${uid}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progressValue);
            },
            (error) => {
                setUploading(false);
                setProgress(0);
                message.error(`Error uploading file ${error.message}`);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((imgUrl) => {
                    setUploading(false);
                    setProgress(0);
                    updateUserProfileImg(imgUrl);
                    dispatch(setImgUrl(imgUrl));
                    notification.success({
                        message:'Upload successfully'
                    })
                })
            }
        )
    };

    const handleDelete = () => {
        dispatch(setImgUrl(''));
        dispatch(setSavedToFalse('ProfileSection'));
        notification.error({
            message: 'Upload your photo!'
        })
    }

    const handleChange = () => {
        if(pages.ProfileSection.saved === true){
            dispatch(setSavedToFalse('ProfileSection'));
        };
    };

    return(
        <Flex align="center" justify="center" vertical style={{width: '100%', padding: 10 }}>
        <Title style={{color: token.blue}}>Add your profile details</Title>
        <Form 
        onFieldsChange={handleChange}
        form={form}
        onFinish={handleData}
        initialValues={profileSection}
        style={{width: '100%', padding: '3%'}}
        layout="vertical"
        > 
            <Flex justify='space-between'>
                <Col style={{width: '48%'}}>
                    <Form.Item
                label='First Name'
                className="formItem"
                name='firstName'
                rules={[{
                    required: true,
                    message: 'Please enter your first name'
                }]}
                >
                    <Input className="Input" placeholder="First Name" type='text'></Input>
                </Form.Item>
                </Col>

                <Col style={{width: '48%'}}>
                    <Form.Item
                label='Last Name'
                className="formItem"
                name='lastName'
                rules={[{
                    required: true,
                    message: 'Please enter your last name'
                }]}
                >
                    <Input className="Input" placeholder="Last Name" type='text'></Input>
                </Form.Item>
                </Col>
            </Flex>
            <Flex justify='space-between'>
            <Col style={{width: '48%'}}>
            <Form.Item
              label='Phone Number'
                className="formItem"
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
                    <Input className="Input" placeholder="Phone Number" type='text'></Input>
                </Form.Item>
                </Col>

                <Col style={{width: '48%'}}>
                    <Form.Item
                      label='Adress'
                className="formItem"
                name='adress'
                rules={[{
                    required: true,
                    message: 'Please enter your adress'
                }]}
                >
                    <Input className="Input" placeholder="Adress" type='text'></Input>
                </Form.Item>
                </Col>
            </Flex>
            <Form.Item
              label='Upload Your Photo'
                className="formItem"
            rules={[{
                required: true,
                message: 'Upload your photo'
            }]}
            >
                <ImgUpload
                progress={progress} 
                uploading={uploading} 
                handleUpload={handleUpload}
                handleDelete={handleDelete}
                />
            </Form.Item>
                    <Form.Item
                label='Description for resume'
                className="formItem"
                name='description'
                rules={[{
                    required: true,
                    message: 'Please enter your first name'
                }]}
                >
                    <Input className="Input" placeholder="Description" type='text'></Input>
                </Form.Item>
            <Button size="large" type='primary' htmlType='submit'>Save</Button>
            <Title level={4} style={{color:'rgba(0, 136, 255, 0.7)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </Flex>
    )
}

export default ProfileSection;