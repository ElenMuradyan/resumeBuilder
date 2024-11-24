import { Select, Typography, Button, notification, theme } from "antd";
import { skills } from "../../../../core/utils/mainPage";
import { useSelector, useDispatch } from "react-redux";
import { setCreated, setSkillsSection } from "../../../../state-management/slices/ResumeInfo";
import { setCurrent, setSavedToFalse, setSavedToTrue } from "../../../../state-management/slices/mainSlice";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../../state-management/slices/userProfile";
import { addResumeDetails } from "../../../../core/functions/createResume";
const { Title } = Typography;

const SkillsSection = () => {
    const { token } = theme.useToken();
    const { userProfileInfo: { userData: { uid } } } = useSelector(store => store.userProfile);
    const { skillsSection } = useSelector(store => store.resumeInfo.resumeData);
    const { resumeId, resumeData } = useSelector(store => store.resumeInfo);
    const { pages } = useSelector(state => state.main);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = skills.map((skill, idx) => ({
        label: skill,  
        value: skill, 
        idx: idx
    }));

    const handleSelect = (value) => {
        dispatch(setSavedToFalse('SkillsSection'));
        dispatch(setSkillsSection(value));
    };

    const handleSave = () => {
        notification.success({
            message: 'Data sent successfully:)',
        });
        dispatch(setSavedToTrue('SkillsSection'));
    }

    const createResume = () => {
        const unsaved = [];
        
        for(let key in pages){
            let item = pages[key];
            !item.saved && unsaved.push(item.idx);
        }
        if(unsaved.length > 0){
        dispatch(setCurrent(unsaved[0]));
        notification.error({
            message: 'I see you forgot to save the changes you made!'
        })}else{
            addResumeDetails(uid, resumeId, {created: true, ...resumeData});
            addResumeDetails(uid, resumeId, {created: true});
            dispatch(setCreated());
            navigate(`resume/${resumeId}`);
            dispatch(setLoading(true));
            setTimeout(() => dispatch(setLoading(false)), 3000);
        }      
    };

    return(
        <>
            <Title style={{color: token.blue, textAlign: 'center'}}>Add your Skills</Title>
            <Select
                label='Your Skills'
                value={skillsSection}
                mode="tags"
                style={{ width: '100%', paddingRight: '3%', paddingLeft: '3%', paddingBottom:'1%' }}
                placeholder="Skills"
                options={options}
                onChange={handleSelect}
            />
            <div style={{width: '100%', paddingLeft: '3%'}}>
            <Button type='primary' onClick={handleSave}>Save</Button>
            <Title level={5} style={{color:'rgba(0, 136, 255, 0.487)', margin:0}}>If you have made changes don't forget to save them</Title>
            <Button onClick={createResume} type='primary'>Create Your Resume</Button> 
            </div>
        </>
    )
};

export default SkillsSection;