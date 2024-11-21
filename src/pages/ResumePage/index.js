import Resume from "../../components/sheard/Resume"
import { useSelector } from "react-redux";
import { Button, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../core/utils/constants";
import { addResumeDetails } from "../../core/functions/createResume";
const { Title } = Typography;

const ResumePage = () => {
    const { userProfileInfo: { userData: { uid } } } = useSelector(store => store.userProfile);
    const { resumeData, resumeId } = useSelector(store => store.resumeInfo);

    addResumeDetails(uid, resumeId, resumeData);

    return (
    <Flex align="center" justify="center" vertical style={{width: '100%', height: '100vh - 80px', marginTop: 100}}>
            <Title style={{color: 'white'}}>Your Resume</Title>
    <Resume data={resumeData}></Resume><br/>
    <Link to={ROUTE_CONSTANTS.WELCOMEPAGE}><Button type="primary">HOME</Button></Link>
        </Flex>
    )
};

export default ResumePage;