'use client'

import { HeroHighlightDemo } from "@/components/HeroHighlightDemo";
import DownloadButton from "@/components/resume/DownloadButton";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ThemeSelector } from "@/components/ThemeSelector";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { education, experience, project } from "@/features/resume/EducationSection/types";
import { ProfileSection, resume, SocialSection } from "@/features/resume/types";
import { themes } from "@/lib/constants";
import { extractArray } from "@/lib/helpers/reduceFormValues";
import { getResume } from "@/services/firebase/databeseActions";
import { realTimeDb } from "@/services/firebase/firebase";
import { RootState } from "@/state-management/store";
import { onValue, ref } from "firebase/database";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Resume () {
    const [ resume, setResume ] = useState<resume | null>(null);
    const { resumeId } = useParams();
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);

    useEffect(() =>{
        if (userData) {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}`);
            const unsubscribe = onValue(resumeRef, (snapshot) => {
                const data = snapshot.val();
                
                if (data) {
                    const resumeInfo = {
                        ProfileSection: data.ProfileSection as ProfileSection,
                        EducationSection: extractArray<education>(data.EducationSection),
                        ProjectSection: extractArray<project>(data.ProjectSection),
                        ExperienceSection: extractArray<experience>(data.ExperienceSection),
                        SocialSection: data.SocialSection as SocialSection,
                        SkillsSection: data.SkillsSection?.skills as string[],
                        theme: data.theme || 'classic',
                    };
                setResume(resumeInfo as resume);
                }
            });
        
            return () => unsubscribe(); 
            }        
    }, [userData, resumeId]);

    return(
        <HeroHighlightDemo className='flex h-[100%] w-[100%] items-center justify-center'>
        <div className="w-[100%] pt-25 h-auto flex flex-col items-center justify-center">
            <TextGenerateEffect words="Your Resume"/>
            {
                resume &&    
                <div className="flex flex-col max-w-[400px] gap-3 items-center justify-center">
                <ThemeSelector />
                <ResumePreview data={resume}/>
                <DownloadButton themeColors={themes[resume.theme || 'classic']} data={resume}/>
                </div>         
            }
        </div>
        </HeroHighlightDemo>
    )
}