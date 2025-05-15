import { education, experience, project } from "./EducationSection/types"

export interface resume {
    ProfileSection: ProfileSection,
    EducationSection: education[],
    ProjectSection: project[],
    ExperienceSection: experience[],
    SocialSection: SocialSection,
    SkillsSection: string[],
}

export type SocialSection = {
    instagram: string,
    linkedin: string,
    facebook: string,
    twitter: string
}

export type ProfileSection = {
    address: string,
    firstName: string,
    lastName: string,
    profession: string,
    imgUrl: string,
    phoneNumber: string,
    summary: string,
}