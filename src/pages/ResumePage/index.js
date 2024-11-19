import Resume from "../../components/sheard/Resume"
import { useSelector } from "react-redux";

const ResumePage = () => {
    const { resumeData } = useSelector(store => store.resumeInfo);
    return <Resume data={resumeData}></Resume>
};

export default ResumePage;