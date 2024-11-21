import { Button, Flex, Typography } from "antd"
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../core/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { createResume } from '../../core/functions/createResume';
import { setResumeId } from "../../state-management/slices/ResumeInfo";
import { resumeInfoRender } from "../../state-management/slices/ResumeInfo";
import { mainRender } from "../../state-management/slices/mainSlice";
import Wrapper from "../../components/sheard/AuthWrapper";

const { Title } = Typography;

const WelcomePage = () => {
    const { userProfileInfo: { userData } } = useSelector(store => store.userProfile);
    const { resumeData, resumeId } = useSelector(store => store.resumeInfo);
    const dispatch = useDispatch();

    const handleStart = async () => {
        // dispatch(setResumeId());
        try{
            dispatch(resumeInfoRender());
            dispatch(mainRender());
            await createResume(userData.uid, resumeId, resumeData);
        }catch(e){
            console.log(e);
        }
    };

    return (
            <Wrapper height='100%' className='text_container'>
                <Flex vertical align="center">
                <Title level={3} style={{color: 'rgba(0, 60, 255, 0.64)', textAlign: 'center'}}>
            Resume Creator is a user-friendly web application that allows individuals to easily create, customize, and manage their professional resumes. With intuitive templates and a simple interface, users can quickly input their personal details, work experience, education, and skills. The app also supports uploading resumes and adding images, making it a comprehensive tool for job seekers looking to build an impressive resume with ease.
            </Title>
            <Link to={ROUTE_CONSTANTS.MAIN}><Button size="large" type="primary" onClick={handleStart}>Create Your Resume</Button></Link>
                </Flex>
            </Wrapper>
        )
};

export default WelcomePage;