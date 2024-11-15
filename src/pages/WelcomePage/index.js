import { Button, Typography } from "antd"
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../core/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { createResume } from '../../core/functions/createResume';
import { setResumeId } from "../../state-management/slices/ResumeInfo";

const { Text } = Typography;

const WelcomePage = () => {
    const { userProfileInfo: { userData } } = useSelector(store => store.userProfile);
    const { resumeData, resumeId } = useSelector(store => store.resumeInfo);
    const dispatch = useDispatch();

    const handleStart = async () => {
        // dispatch(setResumeId());
        console.log(resumeId)
        try{
            await createResume(userData.uid, resumeId, resumeData);
        }catch(e){
            console.log(e);
        }
    };

    return (
        <div>
            <Text>
            Resume Creator is a user-friendly web application that allows individuals to easily create, customize, and manage their professional resumes. With intuitive templates and a simple interface, users can quickly input their personal details, work experience, education, and skills. The app also supports uploading resumes and adding images, making it a comprehensive tool for job seekers looking to build an impressive resume with ease.
            </Text>
            <Link to={ROUTE_CONSTANTS.MAIN}><Button onClick={handleStart}>Start</Button></Link>
        </div>
    )
};

export default WelcomePage;