import { realTimeDb } from "@/services/firebase/firebase";
import { ref, set, update } from "firebase/database";
import { handleAddInterface, HandleRealTimeChangeParams, levelType } from "./types";
import { extractObject, reduceFormValues } from "@/lib/helpers/reduceFormValues";
import { addObjects } from "@/lib/constants";


export const handleRealTimeEducationChange = async ({
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
    
export const handleAdd = <T extends object>({section, setSection, userData, resumeId, form, level}: handleAddInterface<T>) => {
    const newSectionItem = addObjects[level as levelType] as T;

    const updatedSection = [ ...section, newSectionItem ] as T[];
    const data = extractObject<T>(updatedSection, form);
    setSection(updatedSection);
    if(userData && typeof resumeId === 'string' && typeof level === 'string'){
        const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
        set(resumeRef, data);
    }
}

export const handleDelete = <T extends object>({section, setSection, userData, resumeId, form, level}: handleAddInterface<T>) => {
    const updatedEducation = section.slice(0, section.length -1);
    setSection(updatedEducation);

    if(userData && typeof resumeId === 'string'){
        const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
        set(resumeRef, extractObject<T>(updatedEducation, form));
    }
}
