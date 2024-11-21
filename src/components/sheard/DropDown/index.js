import { Avatar, Dropdown, Typography, Flex, theme } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../../state-management/slices/userProfile";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import './index.css';

const { Text } = Typography;
const { useToken } = theme; 

const DropDown = () => {
    const { userProfileInfo: { userData: { firstName, lastName, email } } } = useSelector(store => store.userProfile);
    const dispatch = useDispatch();
    const { token } = useToken();
    const navigate = useNavigate();

    const setFullNameLetter = ({ firstName, lastName }) => {
        if (firstName && lastName){
            return `${firstName[0]} ${lastName[0]}`;
        };
        return '-';
    }

    const handleSignOut = async () => {
        try{
            await signOut(auth);
            dispatch(setIsAuth(false));
        }catch(error){
            console.log(error);
        }
    };

    const items = [
        {
            label: 'Your Resumes',
            key:'0',
            onClick:() => navigate(ROUTE_CONSTANTS.RESUMES),
        },
        {
            label: 'Logout',
            key:'logout',
            onClick:handleSignOut,
        }
    ]
    return (
        <Dropdown 
        menu={{ items }} 
        trigger={['hover']}
        dropdownRender={(menu) => {
            return(
                <div style={{
                    borderRadius: token.borderRadiusLG,
                    backgroundColor: token.colorBgElevated,
                    boxShadow: token.boxShadowSecondary,
                  }}>
                    <Flex vertical align="center" style={{padding:token.sizeMS}} className="profile_dropdown_container">
                        <Text>{firstName} {lastName}</Text>
                        <Text type="secondary" underline>{email}</Text>
                    </Flex>
                    {menu}
                </div>
            )
        }}
        >
            <Avatar size={"large"} className="user_profile_avatar">
                { setFullNameLetter({firstName, lastName}) }
            </Avatar>
        </Dropdown>
    );
};
export default DropDown;