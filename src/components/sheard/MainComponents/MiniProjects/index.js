import { Typography, Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setMiniProjectSection } from "../../../../state-management/slices/ResumeInfo";
import { saveProfileToFirestore } from "../../../../core/functions/createResume";
import { miniProject } from "../../../../state-management/slices/ResumeInfo";
const { Title } = Typography;

const MiniProjectSection = () => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { resumeId } = useSelector(store => store.resumeInfo);
    const { userData: { uid } } = useSelector(store => store.userProfile.userProfileInfo);
    const { miniProjects } = useSelector(store => store.resumeInfo.resumeData);

    const handleData = async values => {
        const keys = Object.keys(values);
        let valueData = [];
        for( let i = 0; i<keys.length/3; i++){
            const data = {
                name: values[`name${i}`],
                techStack: values[`techStack${i}`],
                description: values[`description${i}`],
            }
            valueData.push(data);
        }
            dispatch(setMiniProjectSection(valueData));
            try {
                await saveProfileToFirestore(uid, resumeId, 'miniProjectSection' ,miniProjects);
            } catch (error) {
                console.error('Error saving profile to Firestore:', error);
            }
        };

    const handleAddProject = () => {
        const updatedProjects = [...miniProjects, miniProject];
        dispatch(setMiniProjectSection(updatedProjects));
        form.setFieldsValue(updatedProjects.reduce((acc, project, idx) => {
            acc[`name${idx}`] = project.name;
            acc[`techStack${idx}`] = project.techStack;
            acc[`description${idx}`] = project.description;
            return acc;
        }, {}));
    };

    const handleDeleteProject = () => {
        const updatedProjects = [...miniProjects.slice(0, miniProjects.length - 1)];
        dispatch(setMiniProjectSection(updatedProjects));
        form.setFieldsValue(updatedProjects.reduce((acc, project, idx) => {
            acc[`name${idx}`] = project.name;
            acc[`techStack${idx}`] = project.techStack;
            acc[`description${idx}`] = project.description;
            return acc;
        }, {}));
    };
    
    const handleFieldChange = (_, allvalues) => {
        const keys = Object.keys(allvalues);
        let valueData = [];
        for( let i = 0; i<keys.length/4; i++){
            const data = {
                name: allvalues[`name${i}`],
                techStack: allvalues[`techStack${i}`],
                description: allvalues[`description${i}`],
            }
            valueData.push(data);
        }
            dispatch(setMiniProjectSection(valueData));
    };

    return(
        <>
        <Title>Add your Mini Projects</Title>
        <div>
            <Form form={form} onFinish={handleData} onValuesChange={handleFieldChange}>
                {
                    miniProjects.map((project, idx)=> {
                        return(
                            <div key={idx}>
                             <Form.Item
                            label='Project Name'
                            name={`name${idx}`}
                            initialValue={project.name}
                            rules={[{
                                required:true,
                                message: 'Enter Project Name!'
                            }]}
                            >
                                <Input placeholder="Project Name" type="text"/>
                            </Form.Item>
                            <Form.Item
                            label='Tech Stack'
                            name={`techStack${idx}`}
                            initialValue={project.techStack}
                            rules={[{
                                required:true,
                                message: 'Enter the Tech Stack!'
                            }]}
                            >
                                <Input placeholder="Tech Stack" type="text"/>
                            </Form.Item>
                                <Form.Item
                            label='Description'
                            name={`description${idx}`}
                            initialValue={project.description}
                            rules={[{
                                required:true,
                                message: 'Enter the Description!'
                            }]}
                            >
                                <Input placeholder="Description" type="text"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                  <Button onClick={handleAddProject}>Add Project</Button>
                  <Button disabled={miniProjects.length === 1} onClick={handleDeleteProject}>Delete Project</Button><br/>
                <Button htmlType='submit' type='primary'>Save</Button>
                <Title level={5} style={{color:'rgba(0, 136, 255, 0.487)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </div>
        </>
    )
};

export default MiniProjectSection;