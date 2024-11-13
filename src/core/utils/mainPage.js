import ProfileSection from "../../components/sheard/ProfileSection";

export const steps = [
    {
      title: 'Profile Section',
      content: <ProfileSection/>,
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
  
export const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    status: item.status
}));