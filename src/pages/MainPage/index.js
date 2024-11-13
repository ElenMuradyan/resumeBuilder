import { Button, message, theme, Steps } from 'antd';
import { useState } from 'react';

const steps = [
  {
    title: 'Profile Section',
    content: 'First-content',
    status: 'process'
  },
  {
    title: 'Education Section',
    content: 'Second-content',
    status: 'process'
  },
  {
    title: 'Skills Sector',
    content: 'Last-content',
    status: 'process'
  },
  {
    title: 'Mini Project',
    content: 'Last-content',
    status: 'process'
  },
  {
    title: 'Social',
    content: 'Last-content',
    status: 'process'
  },
];

const MainPage = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    status: item.status
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default MainPage;