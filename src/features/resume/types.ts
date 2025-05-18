import { themes } from "@/lib/constants"
import { education, experience, project } from "./EducationSection/types"
import { error } from "console"

export interface resume {
    ProfileSection: ProfileSection,
    EducationSection: education[],
    ProjectSection: project[],
    ExperienceSection: experience[],
    SocialSection: SocialSection,
    SkillsSection: string[],
    theme: keyof typeof themes,
    createdAt: string,
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

export interface slice {
    loading: boolean,
    error: string | null,
    resumes: Resume[]
}

export type Resume = {
    data: resume,
    date: string,
    id: string,
    summary: string
}