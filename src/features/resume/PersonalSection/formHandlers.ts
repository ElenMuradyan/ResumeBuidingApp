import { reduceFormValues } from "@/lib/helpers/reduceFormValues";
import { handleRemove } from "./types";
import { generateResumeId } from "@/lib/helpers/uniqueID";
import { ref, update } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { HandleRealTimeChangeParams } from "../EducationSection/types";

export const handleRealTimeChange = async ({
    allFields,
    level,
    resumeId,
    userData,
  }: HandleRealTimeChangeParams) => {
    const data = reduceFormValues(allFields);

    if(userData && typeof resumeId === 'string' && typeof level === 'string'){
        try{
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
            await update(resumeRef, data);
        }catch (error) {
            console.error("Realtime update error:", error);
        }            
    }
}

export default async function handleDelete ({userData, resumeId, setImgUrl}: handleRemove) {
        setImgUrl('');
        if (typeof resumeId === 'string') {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/profileSection`);
            await update(resumeRef, { imgUrl: '' });
        }
    }
