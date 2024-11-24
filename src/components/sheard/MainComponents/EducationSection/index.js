import { Typography, Form, Input, Button, theme, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setEducationSection } from "../../../../state-management/slices/ResumeInfo";
import { education } from "../../../../state-management/slices/ResumeInfo";
import { setSavedToFalse, setSavedToTrue } from "../../../../state-management/slices/mainSlice";
const { Title } = Typography;

const EducationSection = () => {
    const { token } = theme.useToken();
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { educationSection } = useSelector(store => store.resumeInfo.resumeData);
    const { pages } = useSelector(state => state.main);

    const handleData = async values => {
        const keys = Object.keys(values);
        let valueData = [];
        for( let i = 0; i<keys.length/4; i++){
            const data = {
                courseName: values[`courseName${i}`],
                completitionYear: values[`completitionYear${i}`],
                collegeSchool: values[`collegeSchool${i}`],
                percentage: values[`percentage${i}`]
            }
            valueData.push(data);
        }
        notification.success({
            message: 'Data sent successfully:)',
        })
            dispatch(setEducationSection(valueData));
            dispatch(setSavedToTrue('EducationSection'));

        };

        const handleAddEducation = () => {
            const updatedEducation = [...educationSection, education];
            dispatch(setEducationSection(updatedEducation));
            form.setFieldsValue(updatedEducation.reduce((acc, project, idx) => {
                acc[`courseName${idx}`] = project.courseName;
                acc[`completitionYear${idx}`] = project.completitionYear;
                acc[`collegeSchool${idx}`] = project.collegeSchool;
                acc[`percentage${idx}`] = project.percentage;
                return acc;
            }, {}));
        };
    
        const handleDeleteEducation = () => {
            const updatedEducation = educationSection.slice(0, educationSection.length - 1);
            dispatch(setEducationSection(updatedEducation));
            form.setFieldsValue(updatedEducation.reduce((acc, project, idx) => {
                acc[`courseName${idx}`] = project.courseName;
                acc[`completitionYear${idx}`] = project.completitionYear;
                acc[`collegeSchool${idx}`] = project.collegeSchool;
                acc[`percentage${idx}`] = project.percentage;
                return acc;
            }, {}));
        };

    const handleFieldChange = (_, allvalues) => {
        if(pages.EducationSection.saved === true){
            dispatch(setSavedToFalse('EducationSection'));
        };
        const keys = Object.keys(allvalues);
        let valueData = [];
        for( let i = 0; i<keys.length/4; i++){
            const data = {
                courseName: allvalues[`courseName${i}`],
                completitionYear: allvalues[`completitionYear${i}`],
                collegeSchool: allvalues[`collegeSchool${i}`],
                percentage: allvalues[`percentage${i}`]
            };
            valueData.push(data);
        }
            dispatch(setEducationSection(valueData));
    };
  
    return(
        <>
        <Title level={5} style={{color: token.blue, textAlign: 'center', marginBottom:0}}>Add your Education Details</Title>
        <div>
            <Form form={form} 
            onFinish={handleData} 
            onValuesChange={handleFieldChange} 
            layout="vertical" 
            style={{width: '100%', padding: '3%'}}
            >
                {
                    educationSection.map((education, idx)=> {                        
                        return(
                            <div key={idx}>
                             <Form.Item
                             className="formItem"
                            label='Course Name'
                            name={`courseName${idx}`}
                            initialValue={education.courseName}
                            rules={[{
                                required:true,
                                message: 'Enter Course Name!'
                            }]}
                            >
                                <Input className="Input" placeholder="Course Name" type="text"/>
                            </Form.Item>
                            <Form.Item
                            className="formItem"
                            label='Completition Year'
                            name={`completitionYear${idx}`}
                            initialValue={Number(education.completitionYear)}
                            rules={[{
                                required:true,
                                message: 'Enter the Completition Year!'
                            }]}
                            >
                                <Input className="Input" placeholder="Completition Year" type="number"/>
                            </Form.Item>
                                <Form.Item
                                className="formItem"
                            label='College/School'
                            name={`collegeSchool${idx}`}
                            initialValue={education.collegeSchool}
                            rules={[{
                                required:true,
                                message: 'Enter the College or School!'
                            }]}
                            >
                                <Input className="Input" placeholder="College/School" type="text"/>
                            </Form.Item>
                                <Form.Item
                                className="formItem"
                                label='Percentage'
                                name={`percentage${idx}`}
                                initialValue={education.percentage}
                                rules={[{
                                    required:true,
                                    message: 'Enter the Percentage!'
                                }]}
                                >
                                    <Input className="Input" placeholder="Percentage" type="text"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                    <Button  type='primary' style={{margin: 10}} onClick={handleAddEducation}>Add Education</Button>
                    <Button  type='primary' disabled={educationSection.length === 1} onClick={handleDeleteEducation}>Delete Education</Button><br/>
                    <Button htmlType='submit' type='primary'>Save</Button>
                    <Title level={5} style={{color:'rgba(0, 136, 255, 0.7)', margin:0}}>If you have made changes don't forget to save them</Title>    
            </Form>
        </div>
        </>
    )
};

export default EducationSection;