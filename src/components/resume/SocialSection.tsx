'use client'

import { Form } from "antd";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { RootState } from "@/state-management/store";
import { onValue, ref } from "firebase/database";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { realTimeDb } from "@/services/firebase/firebase";
import { formStyles } from "@/styles/constants";
import { handleRealTimeChange } from "@/features/resume/PersonalSection/formHandlers";

const SocialSection = () => {
    const [ form ] = Form.useForm();
    const [socialSection, setSocialSection] = useState<any>({
        instagram: '',
        facebook: '',
        twitter: '',
        linkedin: ''
    });
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumeId } = useParams();
    const { push } = useRouter();

    useEffect(() => {
        if (userData) {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/SkillsSection`);
            const unsubscribe = onValue(resumeRef, (snapshot) => {
              const data = snapshot.val();
              if (data) {
                setSocialSection(data);
                form.setFieldsValue(data);
              }
            });
        
            return () => unsubscribe(); 
          }        
    }, [userData, resumeId])

    return(
        <Form 
        form={form}
        onFieldsChange={(_, allFields) => userData && handleRealTimeChange({allFields, level: 'SkillsSection', resumeId, userData, push})}
        initialValues={socialSection}
        style={formStyles}
        layout="vertical"
        > 
            <h1 className="text-white text-2xl">ADD YOUR SOCIAL INFO</h1>
            
            <Form.Item
                className="formItem"
                name='instagram'
                rules={[{
                    required: true,
                    message: 'Enter your Instagram link!'
                }]}
                >
                    <Input className="Input" placeholder='Instagram Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                className="formItem"
                name='facebook'
                rules={[{
                    required: true,
                    message: 'Enter your Facebook link!'
                }]}
                >
                    <Input className="Input" placeholder='Facebook Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                className="formItem"
                name='twitter'
                rules={[{
                    required: true,
                    message: 'Enter your Twitter link!'
                }]}
                >
                    <Input className="Input" placeholder='Twitter Link' type='text'></Input>
                </Form.Item>
                <Form.Item
                className="formItem"
                name='linkedin'
                rules={[{
                    required: true,
                    message: 'Enter your LinkedIn link!'
                }]}
                >
                    <Input className="Input" placeholder='LinkedIn Link' type='text'></Input>
                </Form.Item>
            </Form>
    )
}

export default SocialSection;