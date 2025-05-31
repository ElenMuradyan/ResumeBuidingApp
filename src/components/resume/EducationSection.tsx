'use client'

import { Form } from "antd";
import { useSelector } from "react-redux";
import { handleDelete, handleRealTimeChange, handleAdd } from "@/features/resume/formHandlers";
import { useParams } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import MagicButton from "../ui/magic-button";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { extractArray } from "@/lib/helpers/reduceFormValues";
import { formItemStyle, formStyles } from "@/styles/constants";
import { Input } from "../ui/input";
import { education } from "@/features/resume/types";

const EducationSection = () => {
    const [ form ] = Form.useForm();
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const [ educationSection, setEducationSection ] = useState<education[]>([{                
        courseName: "",
        completitionYear: '',
        collegeSchool: "",
        percentage: ''
    }]);

        useEffect(() => {
            if (userData && typeof resumeId === "string") {
                const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/EducationSection`);
                const unsubscribe = onValue(resumeRef, (snapshot) => {
                  const data = snapshot.val();
                  
                  if (data) {
                    setEducationSection(extractArray<education>(data) as education[]);
                    form.setFieldsValue(data)
                  }
                });
            
                return () => unsubscribe(); 
              }        
        }, [userData, resumeId]);
    
    return(
            <Form 
            form={form} 
            onFieldsChange={(_, allFields) => userData && handleRealTimeChange({allFields, level: 'EducationSection', resumeId, userData})}
            layout="vertical" 
            style={formStyles}
            >
                <h1 className="text-white text-2xl">Add your Education Details</h1>
                {
                    educationSection.map((education, idx)=> {                        
                        return(
                            <div style={{width: '100%'}} key={idx}>
                             <Form.Item
                            style={formItemStyle}
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
                            style={formItemStyle}
                            className="formItem"
                            name={`completitionYear${idx}`}
                            initialValue={education.completitionYear}
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
                            style={formItemStyle}
                            >
                                <Input className="Input" placeholder="College/School" type="text"/>
                            </Form.Item>
                                <Form.Item
                                style={formItemStyle}
                                className="formItem"
                                name={`percentage${idx}`}
                                initialValue={education.percentage}
                                rules={[{
                                    required:true,
                                    message: 'Enter the Percentage!'
                                }]}
                                >
                                    <Input className="Input" placeholder="Percentage" type="number"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                    <MagicButton onClick={() => handleAdd<education>({section: educationSection, setSection: setEducationSection, userData, resumeId, level: 'EducationSection', form})} text='Add Education'/>
                    <MagicButton disabled={educationSection.length === 1} onClick={() => handleDelete<education>({section: educationSection, setSection: setEducationSection, userData, resumeId, level: 'EducationSection', form})} text="Delete Education"/>
                    <br/>
            </Form>
    )
};

export default EducationSection;