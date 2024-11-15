import { Button, theme, Steps, Flex } from 'antd';
import { useState } from 'react';
import { items, steps } from '../../core/utils/mainPage';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCurrent, decrementCurrent } from '../../state-management/slices/mainSlice';
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
    <Flex align='center' gap={10} vertical style={{padding:'10px'}}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
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