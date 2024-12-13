import { Flex, Typography, theme } from "antd";
import DropDown from "../../sheard/DropDown";
import { STYLES } from "../../../core/utils/constants";

import './index.css';

const { Title } = Typography;

const Header = () => {
    const { token } = theme.useToken();

    return(
        <Flex className='header_container' justify='space-between' style={{backgroundColor: token.blue}}>
        <DropDown/>
            <Title level={4} style={{padding: 0, margin: 0, color: STYLES.WHITE}}>RESUME GENERATOR</Title>
        </Flex>
    )
};

export default Header;