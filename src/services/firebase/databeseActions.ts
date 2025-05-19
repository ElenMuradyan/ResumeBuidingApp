import { FIRESTORE_PATH_NAMES, theme } from "@/lib/constants";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { userData } from "@/features/auth/types";
import { resume, Resume } from "@/features/resume/types";

export const updateUser = async (uid: string, updateObject: object) => {
    try{
    const ref = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    await updateDoc(ref, updateObject);
    }catch(err: any){
        console.log(err.message);
    }
}

export const getUser = async (uid: string) => {
    try{

    }catch(err: any){
        console.log(err.message);
    }
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data() as userData;
}

export const getUserResumes = async (uid: string) => {
    try{
        const resumesRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, FIRESTORE_PATH_NAMES.RESUMES);
        const resumesSnap = await getDocs(resumesRef);

        const resumes = resumesSnap.docs.map(doc => ({
            ...doc.data() as Resume
        }));
    
        return resumes;    
    }catch(err: any){
        console.log(err.message);
        return [];
    }
}

export const getResume = async (uid: string, resumeId: string) => {
    try{
        const resRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, FIRESTORE_PATH_NAMES.RESUMES, resumeId);
        const snap = await getDoc(resRef);

        if(!snap.exists()){
            throw new Error("Resume Info wasn't found.");
        }

        const {data} = snap.data();
        return data as resume;
    }catch(err: any){
        console.log(err.message);
        return null;
    }
}

export const updateResumeTheme = async (uid: string, resumeId: string, theme: theme) => {
    try{
        const resRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, FIRESTORE_PATH_NAMES.RESUMES, resumeId);

        const snap = await getDoc(resRef);

        if(!snap.exists()){
            throw new Error("Resume Info wasn't found.");
        }

        const {data} = snap.data();

        await updateDoc(resRef, {data: {
            ...data, theme: theme
        }});
    }catch(err: any){
        console.log(err.message);
    }
}