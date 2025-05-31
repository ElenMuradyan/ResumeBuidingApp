import { realTimeDb } from "@/services/firebase/firebase";
import { get, ref, set, update } from "firebase/database";
import { handleAddInterface, HandleRealTimeChangeParams, handleRemove, levelType } from "./types";
import { extractObject, reduceFormValues } from "@/lib/helpers/reduceFormValues";
import { addObjects, FIRESTORE_PATH_NAMES } from "@/lib/constants";

export const handleRealTimeChange = async ({
        allFields,
        level,
        resumeId,
        userData,
      }: HandleRealTimeChangeParams) => {
        const data = reduceFormValues(allFields);
        try{
            const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}/${level}`);
            await update(resumeRef, data);
        }catch (error) {
            console.error("Realtime update error:", error);
        }            
}
    
export const handleAdd = <T extends object>({section, setSection, userData, resumeId, form, level}: handleAddInterface<T>) => {
    const newSectionItem = addObjects[level as levelType] as T;

    const updatedSection = [ ...section, newSectionItem ] as T[];
    const data = extractObject<T>(updatedSection, form);
    setSection(updatedSection);
    if(userData && typeof resumeId === 'string' && typeof level === 'string'){
        const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}/${level}`);
        set(resumeRef, data);
    }
}

export const handleDelete = <T extends object>({section, setSection, userData, resumeId, form, level}: handleAddInterface<T>) => {
    const updatedSection = section.slice(0, section.length -1);
    setSection(updatedSection);

    if(userData && typeof resumeId === 'string'){
        const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}/${level}`);
        set(resumeRef, extractObject<T>(updatedSection, form));
    }
}


export default async function handleImageDelete ({userData, resumeId, setImgUrl}: handleRemove) {
    setImgUrl('');
    if (typeof resumeId === 'string') {
        const resumeRef = ref(realTimeDb, `${FIRESTORE_PATH_NAMES.USERS}/${userData.uid}/${FIRESTORE_PATH_NAMES.RESUMES}/${resumeId}/profileSection`);
        await update(resumeRef, { imgUrl: '' });
    }
}