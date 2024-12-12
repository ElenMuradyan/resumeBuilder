import { Flex, Typography, Avatar, Button } from "antd";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { STYLES } from "../../../core/utils/constants";

import './index.css'

const { Title, Link } = Typography;

const Resume = ({ data }) => {
    const resumeRef = useRef();
    const { userProfileInfo: { userData: { email } } } = useSelector(store => store.userProfile);

    const downloadResumeAsPDF = () => {
        html2canvas(resumeRef.current, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');

            const pdfWidth = 210; 
            const pdfHeight = 297; 

            const imageWidth = pdfWidth;
            const imageHeight = (canvas.height * pdfWidth) / canvas.width;
    
            pdf.addImage(imgData, 'PNG', 0, 0, imageWidth, imageHeight);
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
        <div className="resume_component"> 
            <Flex 
            ref={resumeRef}
            className="resume_container"
            >
            <Flex className="avatar_container" align="center" justify="space-between" vertical>
                <Flex vertical>
                <Flex vertical>
                    <p className="avatar_text"><FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: STYLES.FONTSIZE, color: STYLES.BLUE, marginRight: STYLES.FONTSIZE }}/> {phoneNumber}</p>
                    <p className="avatar_text"><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: STYLES.FONTSIZE, color: STYLES.BLUE, marginRight: STYLES.FONTSIZE }} /> {adress}</p>
                    <p className="avatar_text"><FontAwesomeIcon icon={faEnvelope} style={{ fontSize: STYLES.FONTSIZE, color: STYLES.BLUE, marginRight: STYLES.FONTSIZE }} />{email}</p>
                </Flex>
                <Avatar src={imgUrl} alt="Resume" size={100}/>
                </Flex>
                <Flex vertical>
                <p className="contact_text">CONTACT</p>
                <Link style={{color: STYLES.OPACITE, fontSize: STYLES.FONTSIZE}} href={instagram}><InstagramOutlined/>My Instagram Account</Link>
                <Link style={{color: STYLES.OPACITE, fontSize: STYLES.FONTSIZE}} href={facebook}><FacebookOutlined />My Facebook Account</Link>
                <Link style={{color: STYLES.OPACITE, fontSize: STYLES.FONTSIZE}} href={twitter}><TwitterOutlined />My Twitter Account</Link>
                <Link style={{color: STYLES.OPACITE, fontSize: STYLES.FONTSIZE}} href={linkedin}><LinkedinOutlined />My LinkedIn Account</Link>
                </Flex>
            </Flex>

            <Flex align="center" vertical>
                <Title level={5}>{firstName} {lastName}</Title>
                <>
                {
                    educationSection.map((item, idx) => {
                        return(
                            <div key={idx}>
                                <p className="course_name">Course Name: {item.courseName}</p>
                                <p>Completition Year: {item.completitionYear}</p>
                                <p>College/School: {item.collegeSchool}</p>
                                <p>Percentage: {item.percentage}</p>
                            </div>
                        )
                    })
                }
                {
                      miniProjects.map((item, idx) => {
                        return(
                            <div key={idx}>
                                <p className="project_name">Project Name:{item.name}</p>
                                <p>Tech Stack: {item.techStack}</p>
                                <p>Description: {item.description}</p>
                            </div>
                        )
                    })
                }
                <ol>
                    <p>My Skills</p>
                    {
                        skillsSection.map((item, idx) => {
                           return(<li key={idx}><p>{item}</p></li>)
                        })
                    }
                </ol>
                </>
            </Flex>
        </Flex>
        <br/>
        <Button size="large" type='primary' onClick={downloadResumeAsPDF}>Download Resume as PDF</Button>
        </div>

)
};

export default Resume;