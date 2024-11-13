import { Avatar, Flex, Typography } from "antd";
import './index.css';

const { Title } = Typography;

const Header = () => {
    const getNameLettters = () => {

    };

    return(
        <Flex className='header_container' justify='space-between'>
            <Avatar>
                {getNameLettters()}
            </Avatar>
            <Title level={4} style={{padding: 0, margin: 0, color: 'white'}}>RESUME GENERATOR</Title>
        </Flex>
    )
};

export default Header;