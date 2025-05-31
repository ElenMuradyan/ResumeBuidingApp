'use client'

import { Form } from "antd";
import { useSelector } from "react-redux";
import { handleAdd, handleDelete, handleRealTimeChange } from "@/features/resume/formHandlers";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import MagicButton from "../ui/magic-button";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { formItemStyle, formStyles } from "@/styles/constants";
import { Input } from "../ui/input";
import { project } from "@/features/resume/types";
import { extractArray } from "@/lib/helpers/reduceFormValues";

const ProjectSection = () => {
    const [ form ] = Form.useForm();
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const [ miniProjects, setMiniProjects ] = useState<project[]>([{                
        projectName: "",
        description: '',
        link: "",
        techStack: ''
    }]);

        useEffect(() => {
            if (userData && typeof resumeId === "string") {
                const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/ProjectSection`);
                const unsubscribe = onValue(resumeRef, (snapshot) => {
                  const data = snapshot.val();
                  
                  if (data) {
                    setMiniProjects(extractArray<project>(data));
                    form.setFieldsValue(data)
                  }
                });
            
                return () => unsubscribe(); 
              }        
        }, [userData, resumeId]);
    
    return(
        <Form 
        form={form} 
        onFieldsChange={(_, allFields) => userData && handleRealTimeChange({allFields, level: 'ProjectSection', resumeId, userData})}
        layout="vertical" 
        style={formStyles}
        >
            <h1 className="text-white text-2xl">ADD YOUR PROJECTS</h1>
            {
                    miniProjects.map((project, idx)=> {
                        return(
                            <div style={{width: '100%'}} key={idx}>
                             <Form.Item
                            className="formItem"
                            name={`projectName${idx}`}
                            initialValue={project.projectName}
                            rules={[{
                                required:true,
                                message: 'Enter Project Name!'
                            }]}
                            style={formItemStyle}
                            >
                                <Input className="Input" placeholder="Project Name" type="text"/>
                            </Form.Item>
                            <Form.Item
                            className="formItem"
                            name={`techStack${idx}`}
                            initialValue={project.techStack}
                            rules={[{
                                required:true,
                                message: 'Enter the Tech Stack!'
                            }]}
                            style={formItemStyle}
                            >
                                <Input className="Input" placeholder="Tech Stack" type="text"/>
                            </Form.Item>
                                <Form.Item
                                className="formItem"
                            name={`description${idx}`}
                            initialValue={project.description}
                            rules={[{
                                required:true,
                                message: 'Enter the Description!'
                            }]}
                            style={formItemStyle}
                            >
                                <Input className="Input" placeholder="Description" type="text"/>
                                </Form.Item>
                             <Form.Item
                                name={`link${idx}`}
                                initialValue={project.link}
                                rules={[{
                                    required:true,
                                    message: 'Enter the Link!'
                                }]}
                                style={formItemStyle}
                                >
                                <Input className="Input" placeholder="Link" type="text"/>
                                </Form.Item>
                            </div>
                        )
                    })
                 } 
                    <MagicButton onClick={() => handleAdd<project>({section: miniProjects, setSection: setMiniProjects, userData, resumeId, level: 'ProjectSection', form})} text='Add Project'/>
                    <MagicButton disabled={miniProjects.length === 1} onClick={() => handleDelete<project>({section: miniProjects, setSection: setMiniProjects, userData, resumeId, level: 'ProjectSection', form})} text="Delete Project"/>
            </Form>
    )
};

export default ProjectSection;