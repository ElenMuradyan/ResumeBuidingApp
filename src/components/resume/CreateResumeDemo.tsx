'use client'

import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { data, FIRESTORE_PATH_NAMES } from "@/lib/constants";
import { ProfileSection, resume, SocialSection } from "@/features/resume/types";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/state-management/store";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { extractArray } from "@/lib/helpers/reduceFormValues";
import { education, project, experience } from "@/features/resume/types";
import { ParamValue } from "next/dist/server/request/params";
import { param } from "@/types/resumeThemeTypes";

export function TimelineDemo() {
    const [ resume, setResume ] = useState<resume | null>(null);
    const [ params, setParams ] = useState<param | null>(null);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const { push } = useRouter();

    useEffect(() => {
        if (userData) {
            const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}`);
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
                        template: data.template
                    };
                setResume(resumeInfo as resume);
                }
            });
        
            return () => unsubscribe(); 
            }        
    }, [userData, resumeId]);

useEffect(() => {
  setParams({resume, resumeId, uid: userData?.uid, push})
}, [resume, resumeId, userData?.uid, push]);

  return (
    <div className="relative h-[auto] w-full overflow-clip">
      {
        params && <Timeline data={data(params)} />
      }
    </div>
  );
}
