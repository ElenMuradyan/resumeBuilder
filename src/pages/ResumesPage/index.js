import { useCallback, useEffect, useState } from "react";
import { fetchResumes } from "../../core/functions/getResumes";
import { useSelector } from "react-redux";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS, STYLES } from "../../core/utils/constants";

import './index.css';

const ResumesPage = () => {
    const { userData: { uid } } = useSelector(store => store.userProfile.userProfileInfo);
    const [ resumes, setResumes ] = useState([]);

    const getResumes = useCallback(async () => {
        let res = await fetchResumes(uid);
        setResumes(res.filter(item => item.created));
    },[uid]);

    useEffect(() => {
        getResumes()
    },[getResumes])
   
    return(<div className="resumes_container">
{
    resumes.length === 0 ? <p style={{color: STYLES.WHITE}}>It seems like you don't have created resumes</p> :
    <Flex wrap="wrap" gap={50} align="center" justify="center" style={{width: '100%'}}>
        {
    resumes.map((item, idx) => {
        return(
            <Link to={`${ROUTE_CONSTANTS.RESUMES}/${item.id}`}>
                <div key={idx} className="resumeLink">
                    <Typography.Title style={{textAlign:'center'}} level={5}>
                         {`Resume Description: ${item.profileSection.description}`}
                         <br/>
                         Click and see your resume
                    </Typography.Title>
                    </div>
                </Link>
        )
    })}
    </Flex>
}
    </div>)
};

export default ResumesPage;