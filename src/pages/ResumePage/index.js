import Resume from "../../components/sheard/Resume"
import { useSelector } from "react-redux";
import { Flex, Typography } from "antd";
const { Title } = Typography;

const ResumePage = () => {
    const { resumeData } = useSelector(store => store.resumeInfo);
    return (
        <Flex align="center" justify="center" vertical>
            <Title>Your Resume</Title>
    <Resume data={resumeData}></Resume>
        </Flex>
    )
};

export default ResumePage;