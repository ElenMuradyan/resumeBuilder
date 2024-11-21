import { Outlet } from "react-router-dom"
import Header from "../../components/global/Header"
import { Flex } from "antd";

const CabinetLayout = () => {
    return(
        <>
        <Header/>
        <Flex vertical justify="center" align="center" style={{width: '100%', height: '80vh'}}>
        <Outlet/>
        </Flex>
        </>
    )
};

export default CabinetLayout;