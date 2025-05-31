import { realTimeDb } from "@/services/firebase/firebase";
import { ref, update } from "firebase/database";
import { FIRESTORE_PATH_NAMES } from "../constants";
import { userData } from "@/features/auth/types";

export const generateResumeId = (template: string, userData: userData) => {
    const timestamp = Date.now().toString(36); 
    const random = Math.random().toString(36).substring(2, 8);
    const id = `resume_${timestamp}_${random}`;

    const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${id}`);
    update(resumeRef, {createdAt: new Date().toLocaleDateString(), template, theme: 'classic'})
    return id;
};