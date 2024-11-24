import Resume from "../../components/sheard/Resume"
import { useSelector } from "react-redux";
import { Button, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../core/utils/constants";
import { fetchResumeById } from "../../core/functions/getResumes";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCallback } from "react";
const { Title } = Typography;

const ResumePage = () => {
    const { userProfileInfo: { userData: { uid } } } = useSelector(store => store.userProfile);
    const [ data, setData ] = useState(null);
    const { id } = useParams();
    console.log(id);

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
    style={{width: '100%',
    height: '100vh - 80px'}}>
            <Title style={{color: 'white'}}>Your Resume</Title>
                <Resume data={data} />
                <Typography.Text style={{ color: 'white' }}>
                    {data === null && 'Error loading resume. Please try again later.'}
                </Typography.Text>
                <br/>
    <Link to={ROUTE_CONSTANTS.WELCOMEPAGE}><Button type="primary">HOME</Button></Link>
        </Flex>
    )
};

export default ResumePage;