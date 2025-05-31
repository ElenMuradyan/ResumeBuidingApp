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
import finishResume from "@/features/resume/resumeHandlers";
import { ParamValue } from "next/dist/server/request/params";
import { param } from "@/types/resumeThemeTypes";

export const navbarItems = [ 'HOME', 'ABOUT', 'RESUMES' ]
   
export const FIRESTORE_PATH_NAMES = {
    REGISTERED_USERS: 'registered_users',
    RESUMES: 'resumes',
    USERS: 'users'
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

export const data = ({resume, resumeId, uid, push}: param) => [
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

export type themeItems = {
  background: string,      
  text: string,            
  accent: string,          
}

export const demoResume: resume = {
  ProfileSection: {
    firstName: "Emily",
    lastName: "Stone",
    profession: "Full Stack Dev",
    summary:
      "Full stack dev with 4+ years of experience. Focused on clean code and fast UIs.",
    phoneNumber: "+1 (555) 123-4567",
    imgUrl: "https://i.pravatar.cc/150?img=48",
    address: "Paris, France",
  },
  ExperienceSection: [
    {
      position: "Senior Frontend Dev",
      company: "TechNova",
      duration: "2022 – Present",
      description:
        "Led frontend team. Boosted performance by 30% with React + Tailwind.",
    },
    {
      position: "Full Stack Dev",
      company: "CodeCraft",
      duration: "2019 – 2021",
      description:
        "Built apps with React, Node.js, and MongoDB. Delivered MVPs fast.",
    },
  ],
  EducationSection: [
    {
      courseName: "B.Sc. Computer Science",
      collegeSchool: "UC Berkeley",
      completitionYear: "2019",
      percentage: "3.8 GPA",
    },
  ],
  SkillsSection: [
    "JavaScript",
    "React",
    "Node.js",
    "Tailwind",
    "MongoDB",
    "Figma",
  ],
  ProjectSection: [
    {
      projectName: "Portfolio",
      techStack: "Next.js, Tailwind",
      description: "Personal portfolio with animations. Deployed on Vercel.",
      link: "https://emilystone.dev",
    },
    {
      projectName: "Dashboard",
      techStack: "React, Firebase",
      description: "Admin panel for orders and users.",
      link: "https://github.com/emilystone/ecommerce-dashboard",
    },
  ],
  SocialSection: {
    linkedin: "https://linkedin.com/in/emilystone",
    twitter: "https://twitter.com/emilystonedev",
    instagram: "https://instagram.com/emily.codes",
    facebook: "https://facebook.com/emily.stone",
  },
  theme: "classic",
  createdAt: "tomorrow",
  template: 'SidebarLeftTemplate'
};
