import EducationSection from "../../components/sheard/MainComponents/EducationSection";
import MiniProjectSection from "../../components/sheard/MainComponents/MiniProjects";
import ProfileSection from "../../components/sheard/MainComponents/ProfileSection";
import SkillsSection from "../../components/sheard/MainComponents/SkillsSection";
import SocialSection from "../../components/sheard/MainComponents/Social";

export const items = [
    {
      key: '0',
      label: 'Profile Section',
      children: <ProfileSection/>,
    },
    {
        key: '1',
        label: 'Education Section',
        children: <EducationSection/>,
      },
      {
        key: '2',
        label: 'Mini Projects',
        children: <MiniProjectSection/>,
      },
      {
        key: '3',
        label: 'Social links',
        children: <SocialSection/>,
      },
      {
        key: '4',
        label: 'Skills',
        children: <SkillsSection/>,
      },
      
]

export const skills = [ 
    'React.js', 
    'Angular', 
    'Next.js', 
    'JavaScript (ES6+)', 
    'TypeScript', 
    'HTML5', 
    'CSS3/Sass', 
    'Redux (or other state management tools)', 
    'RxJS (for Angular)', 
    'Component-Based Architecture', 
    'React Hooks', 
    'Angular Directives', 
    'Next.js API Routes', 
    'Server-Side Rendering (SSR)',
    'Static Site Generation (SSG)', 
    'Responsive Design', 
    'RESTful APIs', 
    'GraphQL', 
    'Testing Libraries (e.g., Jest, Enzyme, Mocha, Jasmine)', 
    'Webpack and Build Tools', 
    'Version Control (Git)', 
    'CI/CD Pipelines',
    'Cross-Browser Compatibility', 
    'Performance Optimization', 
    'Debugging Tools (e.g., Chrome DevTools)', 
    'Code Review Practices', 
    'UI/UX Design Principles', 
    'Accessibility Best Practices (a11y)', 
    'Backend Integration', 
    'NPM/Yarn', 
    'Agile Methodologies', 
    'Project Management Tools (e.g., JIRA, Trello)', 
    'Cloud Services (e.g., AWS, Azure, Google Cloud)', 
    'DevOps Practices' 
];