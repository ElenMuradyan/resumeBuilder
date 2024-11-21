import { Typography, Flex } from 'antd';

import './index.css';

const { Title } = Typography;

const Wrapper = ({ title, children, height }) => {
return(
<Flex align='center' justify='center' className='container' style={{height: height}}>
<Flex className='wrapper' vertical>   
        <Title className="custom-title" level={3} style={{color:'rgba(0, 60, 255, 0.64)'}}>
            { title }
        </Title>
        {children}
        </Flex>
</Flex>
)};

export default Wrapper;