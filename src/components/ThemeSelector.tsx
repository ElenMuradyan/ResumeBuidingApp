'use client'

import { theme, themes } from "@/lib/constants";
import { updateResumeTheme } from "@/services/firebase/databeseActions";
import { realTimeDb } from "@/services/firebase/firebase";
import { RootState } from "@/state-management/store";
import { Select } from "antd";
import { onValue, ref, update } from "firebase/database";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

export const ThemeSelector = () => { 
    const [ selectedTheme, setSelectedTheme ] = useState<theme>('classic');
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();

    const onChange = async (val: theme) => {
        setSelectedTheme(val);
        try{
            const resumeRef = ref(realTimeDb, `users/${userData?.uid}/resumes/${resumeId}`);
            update(resumeRef, { theme: val}); 
            if(userData && typeof resumeId === 'string') {
              await updateResumeTheme(userData?.uid, resumeId, val);   
            }
        }catch(err: any){
            console.log(err.message);
        }
    };

    useEffect(() => {
        if(userData){
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}`);
            const unsubscribe = onValue(resumeRef, (snapshot) => {
                const data = snapshot.val();
              
                if(data.theme){
                    setSelectedTheme(data.theme);
                }
            });
        
            return () => unsubscribe(); 
            }        
    }, [userData, resumeId]);

  return (
    <Select
      className="border p-2 rounded mb-4"
      value={selectedTheme}
      onChange={(e) => onChange(e)}
    >
      {Object.keys(themes).map((theme) => (
        <Option key={theme} value={theme}>
          {theme[0].toUpperCase() + theme.slice(1)}
        </Option>
      ))}
    </Select>
  );
};