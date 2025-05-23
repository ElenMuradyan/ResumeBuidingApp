'use client'

import { Select } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import { get, onValue, ref, update } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { FIRESTORE_PATH_NAMES, options } from "@/lib/constants";

const SkillsSection = () => {
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const [ skillsSection, setSkillsSection ] = useState<string[]>([]);

    useEffect(() => {
        if (userData && typeof resumeId === "string") {
            const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}`);
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
            const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}`);
            await update(resumeRef, {skills: val});

            const snapshot = await get(resumeRef);
            const resume = snapshot.val();

            if(!resume.createdAt){
                await update(resumeRef, {createdAt: new Date().toLocaleDateString()})
            }
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