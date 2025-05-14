'use client'

import { Form } from "antd";
import { useSelector } from "react-redux";
import { handleDeleteEducation, handleRealTimeEducationChange } from "@/features/resume/EducationSection/formHandlers";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import MagicButton from "../ui/magic-button";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { extractEducationArray } from "@/lib/helpers/reduceFormValues";
import { formStyles } from "@/styles/constants";
import { Input } from "../ui/input";
import { education } from "@/features/resume/EducationSection/types";
import { handleAddEducation } from "@/features/resume/EducationSection/formHandlers";

const EducationSection = () => {
    const [ form ] = Form.useForm();
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId, level } = useParams();
    const [ educationSection, setEducationSection ] = useState<education[]>([{                
        courseName: "",
        completitionYear: 0,
        collegeSchool: "",
        percentage: 0
    }]);
    const { push } = useRouter();

        useEffect(() => {
            if (userData && typeof resumeId === "string") {
                const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
                const unsubscribe = onValue(resumeRef, (snapshot) => {
                  const data = snapshot.val();
                  
                  if (data) {
                    setEducationSection(extractEducationArray(data));
                    form.setFieldsValue(data)
                  }
                });
            
                return () => unsubscribe(); 
              }        
        }, [userData, resumeId]);
    
    return(
        <>
        <div>
            <Form form={form} 
            onFieldsChange={(_, allFields) => userData && handleRealTimeEducationChange({allFields, level, resumeId, userData, push})}
            layout="vertical" 
            style={formStyles}
            >
                <h1 className="text-white text-2xl">Add your Education Details</h1>
                {
                    educationSection.map((education, idx)=> {                        
                        return(
                            <div key={idx}>
                             <Form.Item
                             className="formItem"
                            name={`courseName${idx}`}
                            initialValue={education.courseName}
                            rules={[{
                                required:true,
                                message: 'Enter Course Name!'
                            }]}
                            >
                                <Input className="Input" placeholder="Course Name" type="text"/>
                            </Form.Item>
                            <Form.Item
                            className="formItem"
                            name={`completitionYear${idx}`}
                            initialValue={Number(education.completitionYear)}
                            rules={[{
                                required:true,
                                message: 'Enter the Completition Year!'
                            }]}
                            >
                                <Input className="Input" placeholder="Completition Year" type="number"/>
                            </Form.Item>
                                <Form.Item
                                className="formItem"
                            name={`collegeSchool${idx}`}
                            initialValue={education.collegeSchool}
                            rules={[{
                                required:true,
                                message: 'Enter the College or School!'
                            }]}
                            >
                                <Input className="Input" placeholder="College/School" type="text"/>
                            </Form.Item>
                                <Form.Item
                                className="formItem"
                                name={`percentage${idx}`}
                                initialValue={education.percentage}
                                rules={[{
                                    required:true,
                                    message: 'Enter the Percentage!'
                                }]}
                                >
                                    <Input className="Input" placeholder="Percentage" type="text"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                    <MagicButton onClick={() => handleAddEducation({educationSection, setEducationSection, userData, resumeId, level, form})} text='Add Education'/>
                    <MagicButton disabled={educationSection.length === 1} onClick={() => handleDeleteEducation({educationSection, setEducationSection, userData, resumeId, level, form})} text="Delete Education"/>
                    <br/>
            </Form>
        </div>
        </>
    )
};

export default EducationSection;