import { Avatar, Flex } from "antd"

const Header = () => {
    const getNameLettters = () => {

    };

    return(
        <Flex>
            <Avatar>
                {getNameLettters()}
            </Avatar>
        </Flex>
    )
};

export default Header;