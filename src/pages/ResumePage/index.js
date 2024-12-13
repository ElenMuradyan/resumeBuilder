import Resume from "../../components/sheard/Resume"
import { useSelector } from "react-redux";
import { Button, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS, STYLES } from "../../core/utils/constants";
import { fetchResumeById } from "../../core/functions/getResumes";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCallback } from "react";

import './index.css';

const { Title, Text } = Typography;

const ResumePage = () => {
    const { userProfileInfo: { userData: { uid } } } = useSelector(store => store.userProfile);
    const [ data, setData ] = useState(null);
    const { id } = useParams();

    const getResumes = useCallback(async () => {
        try {
            const res = await fetchResumeById(uid, id);
            setData(res);
        }catch (error) {
            console.error('Error fetching resume:', error);
        }
    }, [uid, id]);

    useEffect(() => {
        getResumes();
    }, [id, uid, getResumes]);

    if (!data) {
        return <p>Loading...</p>; 
    }


    return (
    <Flex align="center" 
    justify="center" 
    vertical 
    className="resume_container1">
            <Title style={{color: STYLES.BLUE}}>Your Resume</Title>
                <Resume data={data} />
                <Text style={{ color: STYLES.WHITE }}>
                    {data === null && 'Error loading resume. Please try again later.'}
                </Text>
                <br/>
    <Link to={ROUTE_CONSTANTS.WELCOMEPAGE}><Button type="primary">HOME</Button></Link>
        </Flex>
    )
};

export default ResumePage;