import { FIRESTORE_PATH_NAMES } from "@/lib/constants";
import { db } from "@/services/firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { resume } from "./types";
import { ROUTE_NAMES } from "@/lib/Route_Names";

export default async function finishResume (uid: string, resumeId: string, resumeData: resume, push: (val: string) => void) {
    try{
        const resumeRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, FIRESTORE_PATH_NAMES.RESUMES, resumeId);
        const resumeSnap = await getDoc(resumeRef);
        const data =  {
            data: resumeData,
            date: new Date().toLocaleDateString(),
            id: resumeId,
            summary: resumeData.ProfileSection?.summary || ''
        }
        
        if(resumeSnap.exists()){
            await updateDoc(resumeRef, data);    
        }else{
            await setDoc(resumeRef, data);   
        }
        push(ROUTE_NAMES.RESUMES);
    }catch(err: any){
        console.error("Error finishing resume:", err.message, err);
    }
}