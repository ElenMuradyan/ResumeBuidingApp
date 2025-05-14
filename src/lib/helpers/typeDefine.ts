import { education, project } from "@/features/resume/EducationSection/types";

export function isEducation(item: any): item is education {
    return (
      typeof item.courseName === 'string' &&
      typeof item.completitionYear === 'string' &&
      typeof item.collegeSchool === 'string' &&
      typeof item.percentage === 'string'
    );
  }
  
export function isProject(item: any): item is project {
    return (
      typeof item.projectName === 'string' &&
      typeof item.techStack === 'string' &&
      typeof item.description === 'string' &&
      typeof item.link === 'string'
    );
  }
  