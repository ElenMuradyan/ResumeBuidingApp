'use client'

import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { data } from "@/lib/constants";
import { ProfileSection, resume, SocialSection } from "@/features/resume/types";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/state-management/store";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { extractArray } from "@/lib/helpers/reduceFormValues";
import { education, experience, project } from "@/features/resume/EducationSection/types";

export function TimelineDemo() {
    const [ resume, setResume ] = useState<resume | null>(null);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const { push } = useRouter();
    useEffect(() => {
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


  return (
    <div className="relative h-[auto] w-full overflow-clip">
      <Timeline data={data(resume, resumeId, userData?.uid, push)} />
    </div>
  );
}
