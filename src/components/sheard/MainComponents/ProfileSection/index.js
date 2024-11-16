import { Form, Input, Typography, Flex, Col, Button, message, notification } from "antd";
import { PhoneNumberValidation } from "../../../../core/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setProfileSection } from "../../../../state-management/slices/ResumeInfo";
import { saveProfileToFirestore } from "../../../../core/functions/createResume";
import { useState } from 'react';
import { storage, db } from "../../../../services/firebase";
import { STORAGE_PATH_NAMES,FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setImgUrl } from "../../../../state-management/slices/ResumeInfo";
import { doc, updateDoc } from "firebase/firestore";
import ImgUpload from "../../ImgUpload";

const { Title } = Typography;
const ProfileSection = () => {
    const [ uploading, setUploading ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ form ] = Form.useForm();
    const { resumeData: { profileSection, profileSection: {imgUrl} }, resumeId } = useSelector(store => store.resumeInfo);
    const { userData: { uid } } = useSelector(store => store.userProfile.userProfileInfo);
    const dispatch = useDispatch();

    const handleData = async values => {
        if(imgUrl){
            const valuesdata = {
                imgUrl: imgUrl,
                ...values
            };
    
            dispatch(setProfileSection(valuesdata));
    
            try {
                await saveProfileToFirestore(uid, resumeId, 'profileSection' ,valuesdata);
            } catch (error) {
                console.error('Error saving profile to Firestore:', error);
            }
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
            }catch{
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
                    message.success('Upload successful');
                })
            }
        )
    };

    const handleDelete = () => {
        dispatch(setImgUrl(''));
    }

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
            <Form.Item
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
            <Button type='primary' htmlType='submit'>Save and continue</Button>
            <Title level={5} style={{color:'rgba(0, 136, 255, 0.487)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </>
    )
}

export default ProfileSection;