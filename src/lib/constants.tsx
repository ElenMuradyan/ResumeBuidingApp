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
