'use client'

import { GridItem } from "@/components/MeteorDemo";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { realTimeDb } from "@/services/firebase/firebase";
import { RootState } from "@/state-management/store";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

type Resume =  {
    id: string, 
    summary: string,
    date: string
}

export default function Resumes () {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
console.log(userData);

    useEffect(() => {
        const fetchResumes = async () => {
            const resumesRef = ref(realTimeDb, `users/${userData?.uid}/resumes`);

            try{
                const snapshot = await get(resumesRef);
                
                if(snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    
                    const resumesArray = Object.entries(data).map(([id, value]: any) => {                        
                        return({
                            id,
                            summary: value.ProfileSection?.summary || "",
                            date: new Date(value.createdAt).toLocaleDateString(),
                        })
                    })
                    setResumes(resumesArray);
                }
            }catch(err: any){
                console.log(err.message);
            }
        }
        fetchResumes();
    }, [userData]);

    return(
        <div className="pt-30 flex items-center justify-center flex-col">
            <TextGenerateEffect className="text-center" words="View and Edit Your Resumes"/>
            <div className="w-[90%] h-auto">
            {
                resumes?.map((item, i) => {
                    return(
                        <GridItem key={i} id={item.id} summary={item.summary} date={item.date}/>
                    )
                })
            }
            </div>
        </div>
    )
}