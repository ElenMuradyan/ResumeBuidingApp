import { realTimeDb } from "@/services/firebase/firebase";
import { ref, set, update } from "firebase/database";
import { education, handleAddEducationInterface, HandleRealTimeChangeParams } from "./types";
import { reduceEducationFormValues, reduceFormValues } from "@/lib/helpers/reduceFormValues";


export const handleRealTimeEducationChange = async ({
        allFields,
        level,
        resumeId,
        userData,
      }: HandleRealTimeChangeParams) => {console.log(allFields);
      
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
    
export const handleAddEducation = ({educationSection, setEducationSection, userData, resumeId, form, level}: handleAddEducationInterface) => {
    const newEducationItem = {
        courseName: "",
        completitionYear: 0,
        collegeSchool: "",
        percentage: 0
    };

    const updatedEducation = [ ...educationSection, newEducationItem];
    const data = reduceEducationFormValues(updatedEducation, form);
    setEducationSection(updatedEducation as education[]);
    if(userData && typeof resumeId === 'string' && typeof level === 'string'){
        const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
        set(resumeRef, data);
    }
}

export const handleDeleteEducation = ({educationSection, setEducationSection, userData, resumeId, form, level}: handleAddEducationInterface) => {
    const updatedEducation = educationSection.slice(0, educationSection.length -1);
    setEducationSection(updatedEducation);

    if(userData && typeof resumeId === 'string'){
        const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
        set(resumeRef, reduceEducationFormValues(updatedEducation, form));
    }
}
