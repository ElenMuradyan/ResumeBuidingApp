'use client'

import { Form, Typography, Button, notification } from "antd";
import { PhoneNumberValidation } from "@/lib/validators";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../ui/input";
import type { FieldData } from 'rc-field-form/lib/interface';
import { handleImageUpload } from "@/services/supabase/uploadService";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { ROUTE_NAMES } from "@/lib/constants";
import { RootState } from "@/state-management/store";
import { onValue, ref, update } from "firebase/database";
import { useParams, useRouter } from "next/navigation";
import { generateResumeId } from "@/lib/helpers/uniqueID";
import { useEffect, useState } from "react";
import { realTimeDb } from "@/services/firebase/firebase";
import ImgUpload from "../ImageUpload";
import { formStyles } from "@/styles/constants";
const { Title } = Typography;

const ProfileSection = () => {
    const [ uploading, setUploading ] = useState(false);
    const [ form ] = Form.useForm();
    const [profileData, setProfileData] = useState<any>(null);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const dispatch = useDispatch();
    const [ imgUrl, setImgUrl ] = useState<string>('');
    const { resumeId, level } = useParams();
    const { push } = useRouter();

    useEffect(() => {
        if (userData && typeof resumeId === "string") {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/profileSection`);
            const unsubscribe = onValue(resumeRef, (snapshot) => {
              const data = snapshot.val();
              if (data) {
                setProfileData(data);
                form.setFieldsValue(data);
                if(data.imgUrl){
                    setImgUrl(data.imgUrl);
                }
              }
            });
        
            return () => unsubscribe(); 
          }        
    }, [userData, resumeId])

    const handleUpload = async (options: UploadRequestOption) => {
            setUploading(true);

            if(handleImageUpload){
                try{
                    const imageUrl = await handleImageUpload(options) as string;
                    setImgUrl(imageUrl);

                    if (userData && typeof resumeId === 'string') {
                        const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/profileSection`);
                        await update(resumeRef, { imgUrl: imageUrl });
                    }
                }catch{
                    console.log('Upload failed');
                }finally{
                    setUploading(false);
                }
            }
    };

    const handleDelete = async () => {
        setImgUrl('');
        if (userData && typeof resumeId === 'string') {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/profileSection`);
            await update(resumeRef, { imgUrl: '' });
        }
        notification.error({
            message: 'Upload your photo!'
        });
    }

    const handleRealTimeChange = async (changedFields: FieldData[], allFields: FieldData[]) => {
        const data = allFields.reduce((acc: Record<string, any>, field: FieldData) => {
            acc[field.name[0]] = field.value || '';
            return acc;
        }, {});

        if(resumeId === 'newResume'){
            let id = generateResumeId();
            push(`${ROUTE_NAMES.CREATERESUME}/${id}/${level}`);
            return;
        }
        if(userData && typeof resumeId === 'string'){
            try{
                const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/profileSection`);
                await update(resumeRef, data);
            }catch (error) {
                console.error("Realtime update error:", error);
            }            
        }
    }

    return(
        <Form 
        form={form}
        onFieldsChange={handleRealTimeChange}
        initialValues={profileData}
        style={formStyles}
        layout="vertical"
        > 
            <h1 className="text-white text-2xl">ADD YOUR PERSONAL INFO</h1>
            
            <Form.Item
                className="formItem"
                name='firstName'
                rules={[{
                    required: true,
                    message: 'Please enter your first name'
                }]}
                >
                    <Input placeholder="First Name" type='text'/>
            </Form.Item>

                    <Form.Item
                className="formItem"
                name='lastName'
                rules={[{
                    required: true,
                    message: 'Please enter your last name'
                }]}
                >
                    <Input placeholder="Last Name" type='text'></Input>
                </Form.Item>
            <Form.Item
                className="formItem"
                name='phoneNumber'
                rules={[{
                    required: true,
                    message: 'Please enter your phone number',
                },
                {
                    validator: PhoneNumberValidation,
                }
                ]}
                >
                    <Input placeholder="Phone Number" type='text'></Input>
                </Form.Item>
                    <Form.Item
                    className="formItem"
                    name='adress'
                    rules={[{
                        required: true,
                        message: 'Please enter your adress'
                    }]}
                    >
                        <Input placeholder="Adress" type='text'></Input>
                    </Form.Item>
                <Form.Item
                label='Upload Your Photo'
                className="formItem"
                rules={[{
                    required: true,
                    message: 'Upload your photo'
                }]}
                >
                    <ImgUpload
                    img={imgUrl}
                    uploading={uploading} 
                    handleUpload={handleUpload}
                    handleRemove={handleDelete}
                    />
                </Form.Item>
            <Button size="large" type='primary' htmlType='submit'>Save</Button>
            <Title level={4} style={{color:'rgba(0, 136, 255, 0.7)', margin:0}}>If you have made changes don't forget to save them</Title>
            </Form>
    )
}

export default ProfileSection;