import DownloadButton from "@/components/resume/DownloadButton";
import EducationSection from "@/components/resume/EducationSection";
import ExperienceSection from "@/components/resume/ExperienceSection";
import ProfileSection from "@/components/resume/PersonalInfo";
import ProjectSection from "@/components/resume/ProjectSection";
import { ResumePreview } from "@/components/resume/ResumePreview";
import SkillsSection from "@/components/resume/SkillsSection";
import SocialSection from "@/components/resume/SocialSection";
import { ThemeSelector } from "@/components/ThemeSelector";
import { resume } from "@/features/resume/types";
import TextSpan from "@/components/ui/textSpan";
import MagicButton from "@/components/ui/magic-button";
import { Flex } from "antd";
import finishResume from "@/features/resume/helpers";
import { ParamValue } from "next/dist/server/request/params";

export const ROUTE_NAMES = {
    HOME: '/',
    ABOUT: '/about',
    RESUMES: '/resumes',
    LOGIN:'/sign-in',
    REGISTER:'/sign-up',
    CREATERESUME: '/create-resume',
    EDITRESUME: '/edit-resume',
    RESUME: '/resume',
    PROFILE: '/profile'
}

export const navbarItems = [ 'HOME', 'ABOUT', 'RESUMES' ]
   
export const regexpValidation = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,16}$/;

export const FIRESTORE_PATH_NAMES = {
    REGISTERED_USERS: 'registered_users',
    RESUMES: 'resumes',
}

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

export const options = skills.map((skill, idx) => ({
    label: skill,  
    value: skill, 
    idx: idx
}));

export const data = (resume: resume | null, resumeId: ParamValue, uid: string | undefined, push: (val: string) => void) => [
    {
      title: "Personal Info",
      content: (
        <div>
          <TextSpan className="mb-4 text-xs font-normal" words='Please provide your personal information below. This helps us personalize your resume and ensure everything looks professional.'/>
          <ProfileSection />
        </div>
      ),
    },
    {
      title: "Education Info",
      content: (
        <div>
        <TextSpan className="mb-4 text-xs font-normal" words='Add your education background. Include schools, colleges, and your achievements.'/>
        <EducationSection />
        </div>
      ),
    },
    {
        title: "Experience Info",
        content: (
          <div>
            <TextSpan className="mb-4 text-xs font-normal" words='Add your professional experience. Include job titles, companies, durations, and key responsibilities.'/>
            <ExperienceSection />
          </div>
        ),
      },  
    {
      title: "Your Projects",
      content: (
        <div>
          <TextSpan className="mb-4 text-xs font-normal" words='Highlight your best projects, tech stacks used, and links if available.'/>
          <ProjectSection />
        </div>
      ),
    },
    {
      title: "Your Social Media",
      content: (
        <div>
          <TextSpan className="mb-4 text-xs font-normal" words='Add links to your professional profiles like LinkedIn, GitHub, etc.'/>
          <SocialSection />
        </div>
      ),
    },
    {
      title: "Your Skills",
      content: (
        <div>
          <TextSpan className="mb-4 text-xs font-normal" words="List the technologies and tools you're most comfortable with."/>
          <SkillsSection />
        </div>
      ),
    },
    {
        title: "Your Resume",
        content: (
          <div>
            {
                resume && 
                <div >
                <TextSpan className="mb-4 text-xs font-normal" words="View your resume changing themes and download PDF file." />
                <ThemeSelector />
                <div className="max-w-[400px] pr-[1.5px] flex items-center justify-center h-[100%]">
                <ResumePreview data={resume} />
                </div>
                <Flex justify="space-between" align="center" style={{width: '100%'}}>
                <DownloadButton themeColors={themes[resume.theme || 'classic']} data={resume}/>
                <MagicButton onClick={() => uid && typeof resumeId === 'string' && finishResume(uid, resumeId, resume, push)} text='Finish Resume'/>
                </Flex>
                </div>
            }
          </div>
        ),
      },  
  ];
  

export const addObjects = {
    EducationSection: {
        courseName: '',
        completitionYear: '',
        collegeSchool: '',
        percentage: ''
    },
    ProjectsSection: {
        projectName: '',
        techStack: '',
        description: '',
        link: ''
    },
    ExperienceSection: {
        position: '',
        company: '',
        duration: '',
        description: ''
    }
}

export const themes = {
    classic: {
      background: "#ffffff",       
      text: "#000000",              
      accent: "#2563eb",          
    },
    dark: {
      background: "#111827",     
      text: "#ffffff",              
      accent: "#f59e0b",         
    },
    lavender: {
      background: "#faf5ff",      
      text: "#5b21b6",            
      accent: "#4f46e5",          
    },
    forest: {
      background: "#ecfdf5",        
      text: "#064e3b",             
      accent: "#059669",           
    },
  };
  
export type theme = keyof typeof themes;