import { Typography, Flex } from 'antd';
import { STYLES } from '../../../core/utils/constants';

import './index.css';

const { Title } = Typography;

const Wrapper = ({ title, children, height }) => {
return(
<Flex align='center' justify='center' className='container' style={{height: height}}>
<Flex className='wrapper' vertical>   
        <Title className="custom-title" level={3} style={{color: STYLES.WRAPPERTITLECOLOR}}>
            { title }
        </Title>
        {children}
        </Flex>
</Flex>
)};

export default Wrapper;