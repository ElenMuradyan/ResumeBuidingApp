'use client'

import { Form } from "antd";
import { PhoneNumberValidation } from "@/lib/validators";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { handleImageUpload } from "@/services/supabase/uploadService";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RootState } from "@/state-management/store";
import { onValue, ref, update } from "firebase/database";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { realTimeDb } from "@/services/firebase/firebase";
import ImgUpload from "../ImageUpload";
import { formItemStyle, formStyles } from "@/styles/constants";
import handleImageDelete, { handleRealTimeChange } from "@/features/resume/formHandlers";

const ProfileSection = () => {
    const [ uploading, setUploading ] = useState(false);
    const [ form ] = Form.useForm();
    const [profileData, setProfileData] = useState<any>(null);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const [ imgUrl, setImgUrl ] = useState<string>('');
    const { resumeId } = useParams();

    useEffect(() => {
        if (userData && typeof resumeId === "string") {
            const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/ProfileSection`);
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
                        const resumeRef = ref(realTimeDb, `users/${userData.uid}/resumes/${resumeId}/ProfileSection`);
                        await update(resumeRef, { imgUrl: imageUrl });
                    }
                }catch{
                    console.log('Upload failed');
                }finally{
                    setUploading(false);
                }
            }
    };

    return(
        <Form 
        form={form}
        onFieldsChange={(_, allFields) => userData && handleRealTimeChange({allFields, level: 'ProfileSection', resumeId, userData})}
        initialValues={profileData}
        style={formStyles}
        layout="vertical"
        > 
            <h1 className="text-white text-2xl">ADD YOUR PERSONAL INFO</h1>
            <Form.Item
                className="formItem"
                name='summary'
                rules={[{
                    required: true,
                    message: 'Please enter summary of the resume'
                }]}
                style={formItemStyle}
                >
                    <Input placeholder="Summary" type='text'/>
            </Form.Item>

            <Form.Item
                className="formItem"
                name='firstName'
                rules={[{
                    required: true,
                    message: 'Please enter your first name'
                }]}
                style={formItemStyle}
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
                style={formItemStyle}
                >
                    <Input placeholder="Last Name" type='text'></Input>
                </Form.Item>

                <Form.Item
                className="formItem"
                name='profession'
                rules={[{
                    required: true,
                    message: 'Please enter your profession'
                }]}
                style={formItemStyle}
                >
                    <Input placeholder="Profession" type='text'/>
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
                style={formItemStyle}
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
                    style={formItemStyle}
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
                    handleRemove={() => userData && handleImageDelete({userData, resumeId, setImgUrl})}
                    />
                </Form.Item>
            </Form>
    )
}

export default ProfileSection;