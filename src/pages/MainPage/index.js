import { Button, theme, Tabs, Flex } from 'antd';
import { items } from '../../core/utils/mainPage';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCurrent, decrementCurrent, setCurrent } from '../../state-management/slices/mainSlice';

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
    console.log(key)
    dispatch(setCurrent(Number(key)));
  };

  const contentStyle = {
    width: '100%',
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <Flex align='center' gap={10} vertical style={{padding:'10px', width: '100%'}}>
      <Tabs activeKey={String(current)} defaultActiveKey={String(current)} items={items} style={{width: '100%'}} tabBarStyle={{width: '100%', display: 'flex', justifyContent: 'space-evenly', padding: 0}} centered size='large' onChange={handleTabChange}/>
      <div style={contentStyle}>{items[current].content}</div>
      <Flex justify='space-between' gap={10} style={{width:'50%'}}>
      <Button type="primary" onClick={() => next()}>
            Next
      </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
      </Flex>
    </Flex>
  );
};

export default MainPage;