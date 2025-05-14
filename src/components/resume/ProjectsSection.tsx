'use client'

import { Form } from "antd";
import { useSelector } from "react-redux";
import { handleAdd, handleDelete, handleRealTimeEducationChange } from "@/features/resume/EducationSection/formHandlers";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/state-management/store";
import { useEffect, useState } from "react";
import MagicButton from "../ui/magic-button";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "@/services/firebase/firebase";
import { formItemStyle, formStyles } from "@/styles/constants";
import { Input } from "../ui/input";
import { project } from "@/features/resume/EducationSection/types";
import { extractArray } from "@/lib/helpers/reduceFormValues";

const ProjectSection = () => {
    const [ form ] = Form.useForm();
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId, level } = useParams();
    const [ miniProjects, setMiniProjects ] = useState<project[]>([{                
        projectName: "",
        description: '',
        link: "",
        techStack: ''
    }]);
    const { push } = useRouter();

        useEffect(() => {
            if (userData && typeof resumeId === "string") {
                const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/${level}`);
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
        <Form form={form} 
        onFieldsChange={(_, allFields) => userData && handleRealTimeEducationChange({allFields, level, resumeId, userData, push})}
        layout="vertical" 
        style={formStyles}
        >
            {
                    miniProjects.map((project, idx)=> {
                        return(
                            <div key={idx}>
                             <Form.Item
                             className="formItem"
                            name={`projectName${idx}`}
                            initialValue={project.projectName}
                            rules={[{
                                required:true,
                                message: 'Enter Project Name!'
                            }]}
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
                                >
                                <Input className="Input" placeholder="Link" type="text"/>
                                </Form.Item>

                            </div>
                        )
                    })
                 } 
                    <MagicButton onClick={() => handleAdd<project>({section: miniProjects, setSection: setMiniProjects, userData, resumeId, level, form})} text='Add Education'/>
                    <MagicButton disabled={miniProjects.length === 1} onClick={() => handleDelete<project>({section: miniProjects, setSection: setMiniProjects, userData, resumeId, level, form})} text="Delete Education"/>
            </Form>
    )
};

export default ProjectSection;