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

export const ROUTE_NAMES = {
    HOME: '/',
    ABOUT: '/about',
    RESUMES: '/resumes',
    LOGIN:'/sign-in',
    REGISTER:'/sign-up',
    CREATERESUME: '/create-resume',
}

export const navbarItems = [ 'HOME', 'ABOUT', 'RESUMES' ]
   
export const regexpValidation = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,16}$/;

export const FIRESTORE_PATH_NAMES = {
    REGISTERED_USERS: 'registered_users',
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

export const data = (resume: resume | null) => [
    {
      title: "Personal Info",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Please provide your personal information below. This helps us personalize your resume and ensure everything looks professional.
          </p>
          <ProfileSection />
        </div>
      ),
    },
    {
      title: "Education Info",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Add your education background. Include schools, colleges, and your achievements.
          </p>
          <EducationSection />
        </div>
      ),
    },
    {
        title: "Experience Info",
        content: (
          <div>
            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
              Add your professional experience. Include job titles, companies, durations, and key responsibilities.
            </p>
            <ExperienceSection />
          </div>
        ),
      },  
    {
      title: "Your Projects",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Highlight your best projects, tech stacks used, and links if available.
          </p>
          <ProjectSection />
        </div>
      ),
    },
    {
      title: "Your Social Media",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Add links to your professional profiles like LinkedIn, GitHub, etc.
          </p>
          <SocialSection />
        </div>
      ),
    },
    {
      title: "Your Skills",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            List the technologies and tools you're most comfortable with.
          </p>
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
                <>
                <ThemeSelector />
                <ResumePreview data={resume} />
                <DownloadButton themeColors={themes[resume.theme || 'classic']} data={resume}/>
                </>
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
      background: "#ffffff",        // bg-white
      text: "#000000",              // text-black
      accent: "#2563eb",            // text-blue-600
    },
    dark: {
      background: "#111827",        // bg-gray-900
      text: "#ffffff",              // text-white
      accent: "#f59e0b",            // text-yellow-400
    },
    lavender: {
      background: "#faf5ff",        // bg-purple-50
      text: "#5b21b6",              // text-purple-900
      accent: "#4f46e5",            // text-indigo-600
    },
    forest: {
      background: "#ecfdf5",        // bg-green-50
      text: "#064e3b",              // text-green-900
      accent: "#059669",            // text-emerald-600
    },
  };
  