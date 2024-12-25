import { Typography, Form, Input, Button, theme, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setMiniProjectSection } from "../../../../state-management/slices/ResumeInfo";
import { miniProject } from "../../../../state-management/slices/ResumeInfo";
import { setSavedToFalse, setSavedToTrue } from "../../../../state-management/slices/mainSlice";

const { Title } = Typography;

const MiniProjectSection = () => {
    const { token } = theme.useToken();
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { miniProjects } = useSelector(store => store.resumeInfo.resumeData);
    const { pages } = useSelector(state => state.main);

    const handleData = async values => {
        dispatch(setSavedToTrue('MiniProjectSection'));
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
        notification.success({
            message: 'Data sent successfully:)',
        });
            dispatch(setMiniProjectSection(valueData));
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
        if(pages.MiniProjectSection.saved === true){
            dispatch(setSavedToFalse('MiniProjectSection'));
        }
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
        <Title style={{color: token.blue, textAlign: 'center'}}>Add your Mini Projects</Title>
        <div>
            <Form form={form} onFinish={handleData} onValuesChange={handleFieldChange} style={{padding: '3%'}} layout="vertical">
                {
                    miniProjects.map((project, idx)=> {
                        return(
                            <div key={idx}>
                             <Form.Item
                             className="formItem"
                            label='Project Name'
                            name={`name${idx}`}
                            initialValue={project.name}
                            rules={[{
                                required:true,
                                message: 'Enter Project Name!'
                            }]}
                            >
                                <Input className="Input" placeholder="Project Name" type="text"/>
                            </Form.Item>
                            <Form.Item
                            className="formItem"
                            label='Tech Stack'
                            name={`techStack${idx}`}
                            initialValue={project.techStack}
                            rules={[{
                                required:true,
                                message: 'Enter the Tech Stack!'
                            }]}
                            >
                                <Input className="Input" placeholder="Tech Stack" type="text"/>
                            </Form.Item>
                                <Form.Item
                                className="formItem"
                            label='Description'
                            name={`description${idx}`}
                            initialValue={project.description}
                            rules={[{
                                required:true,
                                message: 'Enter the Description!'
                            }]}
                            >
                                <Input className="Input" placeholder="Description" type="text"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                  <Button type="primary"  style={{margin: 10}} onClick={handleAddProject}>Add Project</Button>
                  <Button type="primary" disabled={miniProjects.length === 1} onClick={handleDeleteProject}>Delete Project</Button>
                  <br/><br/>
                <Button type="primary" htmlType='submit'>Save</Button>
                <Title level={3} style={{color:'rgba(0, 136, 255, 0.7)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </div>
        </>
    )
};

export default MiniProjectSection;