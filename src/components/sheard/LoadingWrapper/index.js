import { Spin, Flex } from "antd";
import { useSelector } from "react-redux";

import './index.css';

const LoadingWrapper = ({ children }) => {
    const { loading } = useSelector(store => store.userProfile);

    return (<>
        {loading ?
         <Flex justify='center' align='center' className="loading" vertical>
            <Spin
            size='large'
            tip="Please wait..."
            fullscreen
            /> 
         </Flex>
        : children}
    </>   
    )
}

export default LoadingWrapper;