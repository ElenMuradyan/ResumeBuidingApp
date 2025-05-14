import { education, experience, project } from "./EducationSection/types"

export interface resume {
    ProfileSection: {
        address: string,
        firstName: string,
        lastName: string,
        profession: string,
        imgUrl: string,
        phoneNumber: string,
        summary: string,
    },
    EducationSection: education[],
    ProjectsSection: project[],
    ExperienceSection: experience[],
    SocialSecton: {
        instagram: string,
        linkedin: string,
        facebook: string,
        twitter: string
    },
    SkillsSection: string[],
}