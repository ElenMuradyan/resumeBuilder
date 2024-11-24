import { Flex, Typography, Avatar, Button } from "antd";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avatar from '../../../core/Images/avatar.webp';
import './index.css'

const { Title, Text, Link } = Typography;

const Resume = ({ data }) => {
    const resumeRef = useRef();
    const { userProfileInfo: { userData: { email } } } = useSelector(store => store.userProfile);

    const downloadResumeAsPDF = () => {
        html2canvas(resumeRef.current, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 4, canvas.height / 4);
            pdf.save('resume.pdf');
        })
    };

    const {
            profileSection: {
                firstName,
                lastName,
                phoneNumber,
                adress,
                imgUrl
            },
            educationSection,
            skillsSection,
            miniProjects,
            socialSection: {
                instagram,
                facebook,
                twitter,
                linkedin
            }
    } = data;

    return(
        <>
            <Flex 
            ref={resumeRef}
            style={{
                backgroundColor: '#f5f5f5',
                width: '794px', 
                height: '1123px',
                overflow: 'hidden',
              }}
            >
            <Flex className="avatar_container" align="center" justify="space-between" vertical>
                <Flex gap={20} vertical>
                <Flex gap={20} vertical>
                    <Text className="avatar_text"><FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: '20px', color: '#1890ff', marginRight: '10px' }}/> {phoneNumber}</Text>
                    <Text className="avatar_text"><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '20px', color: '#1890ff', marginRight: '10px' }} /> {adress}</Text>
                    <Text className="avatar_text"><FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '20px', color: '#1890ff', marginRight: '10px' }} />{email}</Text>
                </Flex>
                <Avatar src={imgUrl || avatar} alt="Resume" size={200}/>
                </Flex>
                <Flex vertical>
                <Title style={{color: 'white'}}>CONTACT</Title>
                <Link style={{color: 'rgba(255, 255, 255, 0.636)'}} href={instagram}><InstagramOutlined/>My Instagram Account</Link>
                <Link style={{color: 'rgba(255, 255, 255, 0.636)'}} href={facebook}><FacebookOutlined />My Facebook Account</Link>
                <Link style={{color: 'rgba(255, 255, 255, 0.636)'}} href={twitter}><TwitterOutlined />My Twitter Account</Link>
                <Link style={{color: 'rgba(255, 255, 255, 0.636)'}} href={linkedin}><LinkedinOutlined />My LinkedIn Account</Link>
                </Flex>
            </Flex>
            <Flex align="center" vertical>
                <Title>{firstName} {lastName}</Title>
                <>
                {
                    educationSection.map((item, idx) => {
                        return(
                            <div key={idx}>
                                <Title level={4}>Course Name:{item.courseName}</Title>
                                <Title level={5} style={{color: 'rgba(0, 0, 0, 0.636)'}}>Completition Year:{item.completitionYear}</Title>
                                <Title level={5} style={{color: 'rgba(0, 0, 0, 0.636)'}}>College/School:{item.collegeSchool}</Title>
                                <Title level={5} style={{color: 'rgba(0, 0, 0, 0.636)'}}>Percentage:{item.percentage}</Title>
                            </div>
                        )
                    })
                }
                {
                      miniProjects.map((item, idx) => {
                        return(
                            <div key={idx}>
                                <Title level={4}>Project Name:{item.name}</Title>
                                <Title level={5} style={{color: 'rgba(0, 0, 0, 0.636)'}}>Tech Stack:{item.techStack}</Title>
                                <Title level={5} style={{color: 'rgba(0, 0, 0, 0.636)'}}>Description:{item.description}</Title>
                            </div>
                        )
                    })
                }
                <ul>
                    <Title level={4}>My Skills</Title>
                    {
                        skillsSection.map((item, idx) => {
                           return(<li key={idx}>{item}</li>)
                        })
                    }
                </ul>
                </>
            </Flex>
        </Flex>
        <br/>
        <Button size="large" type='primary' onClick={downloadResumeAsPDF}>Download Resume as PDF</Button>
        </>

)
};

export default Resume;