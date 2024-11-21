import { Button, theme, Tabs, Flex, Typography } from 'antd';
import { items } from '../../core/utils/mainPage';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCurrent, decrementCurrent, setCurrent } from '../../state-management/slices/mainSlice';

const { Title } = Typography;

const MainPage = () => {
  const { token } = theme.useToken();
  const { current } = useSelector(store => store.main);
  const dispatch = useDispatch();

  const next = () => {
    dispatch(incrementCurrent());
  };

  const prev = () => {
    dispatch(decrementCurrent());
  };

  const handleTabChange = (key) => {
    dispatch(setCurrent(Number(key)));
  };

  const contentStyle = {
    width: '100%',
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.blue}`,
    marginTop: 16,
  };
  return (
    <Flex align='center' vertical style={{width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.739)'}}>
    <Title style={{color:token.blue}}>Create Your Resume</Title>
   <Flex align='center' gap={10} vertical style={{padding:'10px', width: '100%'}}>
      <Tabs 
      activeKey={String(current)} 
      defaultActiveKey={String(current)} 
      items={items} 
      style={{width: '100%'}} 
      tabBarStyle={{
      width: '100%',
      display: 'flex', 
      justifyContent: 'space-evenly', 
      padding:0}} 
      centered 
      size='large' 
      onChange={handleTabChange}
      />
      <Flex style={contentStyle}>{items[current].content}</Flex>
      <Flex justify='space-between' gap={10} style={{width:'50%'}}>
      <Button
            style={{
              margin: '0 8px',
            }}
            type="primary"
            disabled={current===0}
            onClick={() => prev()}
          >
            Previous
          </Button>
      <Button 
      type="primary"
      onClick={() => next()}
      disabled={current===4}
      >
            Next
      </Button>
      </Flex>
    </Flex>
    </Flex>
  );
};

export default MainPage;