'use client'

import { Form } from "antd";
import { useSelector } from "react-redux";
import { handleDelete, handleRealTimeEducationChange, handleAdd } from "@/features/resume/EducationSection/formHandlers";
import { useParams } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import MagicButton from "../ui/magic-button";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { extractArray } from "@/lib/helpers/reduceFormValues";
import { formItemStyle, formStyles } from "@/styles/constants";
import { Input } from "../ui/input";
import { experience } from "@/features/resume/EducationSection/types";

const ExperienceSection = () => {
    const [ form ] = Form.useForm();
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const [ experienceSection, setExperienceSection ] = useState<experience[]>([{                
        position: '',
        company: '',
        duration: '',
        description: '',
          }]);

        useEffect(() => {
            if (userData && typeof resumeId === "string") {
                const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/ExperienceSection`);
                const unsubscribe = onValue(resumeRef, (snapshot) => {
                  const data = snapshot.val();
                  
                  if (data) {
                    setExperienceSection(extractArray<experience>(data) as experience[]);
                    form.setFieldsValue(data)
                  }
                });
            
                return () => unsubscribe(); 
              }        
        }, [userData, resumeId]);
    
    return(
            <Form form={form} 
            onFieldsChange={(_, allFields) => userData && handleRealTimeEducationChange({allFields, level: 'ExperienceSection', resumeId, userData})}
            layout="vertical" 
            style={formStyles}
            >
                <h1 className="text-white text-2xl">Add your Experience Details</h1>
                {
                    experienceSection.map((experience, idx)=> {                        
                        return(
                            <div style={{width: '100%'}} key={idx}>
                            <Form.Item
                            style={formItemStyle}
                            className="formItem"
                            name={`position${idx}`}
                            initialValue={experience.position}
                            rules={[
                                {
                                required: true,
                                message: 'Enter Job Position!',
                                },
                            ]}
                            >
                            <Input className="Input" placeholder="Job Position" type="text" />
                            </Form.Item>

                            <Form.Item
                            style={formItemStyle}
                            className="formItem"
                            name={`company${idx}`}
                            initialValue={experience.company}
                            rules={[
                                {
                                required: true,
                                message: 'Enter Company Name!',
                                },
                            ]}
                            >
                            <Input className="Input" placeholder="Company Name" type="text" />
                            </Form.Item>

                            <Form.Item
                            style={formItemStyle}
                            className="formItem"
                            name={`duration${idx}`}
                            initialValue={experience.duration}
                            rules={[
                                {
                                required: true,
                                message: 'Enter Duration!',
                                },
                            ]}
                            >
                            <Input className="Input" placeholder="Duration (e.g. Jan 2022 - Dec 2023)" type="text" />
                            </Form.Item>

                            <Form.Item
                            style={formItemStyle}
                            className="formItem"
                            name={`description${idx}`}
                            initialValue={experience.description}
                            rules={[
                                {
                                required: true,
                                message: 'Enter Job Description!',
                                },
                            ]}
                            >
                            <Input className="Input" placeholder="Job Description" type="text" />
                            </Form.Item>
                           </div>
                        )
                    })
                 } 
                    <MagicButton onClick={() => handleAdd<experience>({section: experienceSection, setSection: setExperienceSection, userData, resumeId, level: 'ExperienceSection', form})} text='Add Education'/>
                    <MagicButton disabled={experienceSection.length === 1} onClick={() => handleDelete<experience>({section: experienceSection, setSection: setExperienceSection, userData, resumeId, level: 'ExperienceSection', form})} text="Delete Education"/>
                    <br/>
            </Form>
    )
};

export default ExperienceSection;