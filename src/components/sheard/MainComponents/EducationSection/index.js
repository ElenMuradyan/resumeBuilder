import { Typography, Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setEducationSection } from "../../../../state-management/slices/ResumeInfo";
import { saveProfileToFirestore } from "../../../../core/functions/createResume";
import { education } from "../../../../state-management/slices/ResumeInfo";
const { Title } = Typography;

const EducationSection = () => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { resumeId } = useSelector(store => store.resumeInfo);
    const { userData: { uid } } = useSelector(store => store.userProfile.userProfileInfo);
    const { educationSection } = useSelector(store => store.resumeInfo.resumeData);

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
            dispatch(setEducationSection(valueData));
            try {
                await saveProfileToFirestore(uid, resumeId, 'educationSection' ,educationSection);
            } catch (error) {
                console.error('Error saving profile to Firestore:', error);
            }
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
        <Title>Add your Education Details</Title>
        <div>
            <Form form={form} onFinish={handleData} onValuesChange={handleFieldChange}>
                {
                    educationSection.map((education, idx)=> {                        
                        return(
                            <div key={idx}>
                             <Form.Item
                            label='Course Name'
                            name={`courseName${idx}`}
                            initialValue={education.courseName}
                            rules={[{
                                required:true,
                                message: 'Enter Course Name!'
                            }]}
                            >
                                <Input placeholder="Course Name" type="text"/>
                            </Form.Item>
                            <Form.Item
                            label='Completition Year'
                            name={`completitionYear${idx}`}
                            initialValue={Number(education.completitionYear)}
                            rules={[{
                                required:true,
                                message: 'Enter the Completition Year!'
                            }]}
                            >
                                <Input placeholder="Completition Year" type="number"/>
                            </Form.Item>
                                <Form.Item
                            label='College/School'
                            name={`collegeSchool${idx}`}
                            initialValue={education.collegeSchool}
                            rules={[{
                                required:true,
                                message: 'Enter the College or School!'
                            }]}
                            >
                                <Input placeholder="College/School" type="text"/>
                            </Form.Item>
                                <Form.Item
                                label='Percentage'
                                name={`percentage${idx}`}
                                initialValue={education.percentage}
                                rules={[{
                                    required:true,
                                    message: 'Enter the Percentage!'
                                }]}
                                >
                                    <Input placeholder="Percentage" type="text"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                  <Button onClick={handleAddEducation}>Add Education</Button>
                  <Button disabled={educationSection.length === 1} onClick={handleDeleteEducation}>Delete Education</Button><br/>
                <Button htmlType='submit' type='primary'>Save</Button>
                <Title level={5} style={{color:'rgba(0, 136, 255, 0.487)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
        </div>
        </>
    )
};

export default EducationSection;