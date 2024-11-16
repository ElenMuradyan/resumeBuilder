import { Select, Typography, Button } from "antd";
import { skills } from "../../../../core/utils/mainPage";
import { useSelector, useDispatch } from "react-redux";
import { setSkillsSection } from "../../../../state-management/slices/ResumeInfo";

const { Title } = Typography;

const SkillsSection = () => {
    const { skillsSection } = useSelector(store => store.resumeInfo.resumeData);
    const dispatch = useDispatch();

    const options = skills.map((skill, idx) => ({
        label: skill,  
        value: skill, 
        idx: idx
    }));

    const handleSelect = (value) => {
        dispatch(setSkillsSection(skillsSection.concat(value.splice(-1))));
        console.log(skillsSection);
    };

    const createResume = (value) => {
        
    }
    return(
        <>
            <Title>Add your Skills</Title>
            <Select
                label='Your Skills'
                value={skillsSection}
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Skills"
                options={options}
                onChange={handleSelect}
            />
            <Button onClick={() => createResume()} type='primary'>Create Your Resume</Button> 
            <Title level={5} style={{color:'rgba(0, 136, 255, 0.487)', margin:0}}>If you have made changes don't forget to save them</Title>
        </>
    )
};

export default SkillsSection;