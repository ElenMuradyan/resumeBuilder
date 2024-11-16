import EducationSection from "../../components/sheard/MainComponents/EducationSection";
// import MiniProjectSection from "../../components/sheard/MainComponents/MiniProjects";
import ProfileSection from "../../components/sheard/MainComponents/ProfileSection";

export const items = [
    {
      key: '0',
      label: 'Tab 1',
      children: <ProfileSection/>,
    },
    {
        key: '1',
        label: 'Tab 2',
        children: <EducationSection/>,
      },
      {
        key: '2',
        label: 'Tab 3',
        children:'content',
      },
      {
        key: '3',
        label: 'Tab 4',
        children: 'Content of Tab Pane 2',
      },
      {
        key: '4',
        label: 'Tab 5',
        children: 'Content of Tab Pane 3',
      },
]