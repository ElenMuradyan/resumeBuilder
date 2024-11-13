import { Spin, Flex } from "antd";
import { useSelector } from "react-redux";
const LoadingWrapper = ({ children }) => {
    const { loading } = useSelector(store => store.userProfile);

    return (<>
        {loading ?
         <Flex style={{width:'100%', height:'100vh'}} justify='center' align='center' vertical>
            <Spin
            size='large'
            /> 
         </Flex>
        : children}
    </>   
    )
}

export default LoadingWrapper;