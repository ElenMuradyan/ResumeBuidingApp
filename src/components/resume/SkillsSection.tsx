'use client'

import { Select } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import { onValue, ref, update } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { options } from "@/lib/constants";

const SkillsSection = () => {
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const [ skillsSection, setSkillsSection ] = useState<string[]>([]);

    useEffect(() => {
        if (userData && typeof resumeId === "string") {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/SkillsSection`);
            const unsubscribe = onValue(resumeRef, (snapshot) => {
                const data = snapshot.val();
                
                if (data) {
                setSkillsSection(data.skills);
                }
            });
        
            return () => unsubscribe(); 
            }        
    }, [userData, resumeId]);

    const handleSelect = async (val: string[]) => {
        setSkillsSection(val);
        if(userData){
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/SkillsSection`);
            await update(resumeRef, {skills: val});
        }
    }
    return(
            <Select
                value={skillsSection}
                mode="tags"
                style={{ width: '100%', paddingRight: '3%', paddingLeft: '3%', paddingBottom:'1%' }}
                placeholder="Skills"
                options={options}
                onChange={handleSelect}
            />
    )
};

export default SkillsSection;