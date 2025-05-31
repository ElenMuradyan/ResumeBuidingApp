'use client'

import { Form } from "antd";
import { useProfileForm } from "@/hooks/profileForm";
import { formItemStyle, loginFormStyles } from "@/styles/constants";
import { Input } from "./ui/input";
import MagicButton from "./ui/magic-button";
import { PhoneNumberValidation } from "@/lib/validators";
import ProfileImageUpload from "./ProfileImage";

export default function ProfileForm () {
    const { form, handleEditUserProfile, handleRemove, uploading, handleUpload, buttonLoading } = useProfileForm();

    return(
        <Form 
        layout='vertical' 
        form={form} 
        style={loginFormStyles}
        onFinish={handleEditUserProfile}>
        <Form.Item>
            <ProfileImageUpload
            handleRemove={handleRemove}
            uploading={uploading} 
            handleUpload={handleUpload}
            />
        </Form.Item>

        <Form.Item
        name='firstName'
        style={formItemStyle}
        rules={[{
            required:true,
            message:'Please input your First Name'
        }]}
        >
            <Input
                placeholder='First Name'
            />
        </Form.Item>

        <Form.Item
        style={formItemStyle}
        name='lastName'
        rules={[{
            required:true,
            message:'Please input your Last Name'
        }]}
        >
            <Input
                placeholder='Last Name'
            />
        </Form.Item>

        <Form.Item
        name='email'
        style={formItemStyle}
        >
            <Input
                readOnly
                placeholder='Email'
            />
        </Form.Item>

        <Form.Item
        name='phone'
        style={formItemStyle}
        rules={[{
            required:true,
            message:'Please input your Phone Number'
        },
        {
            validator: PhoneNumberValidation,
        }]}
        >
            <Input
                placeholder='Phone Number'
            />
        </Form.Item>
        <hr />
        <div className="flex items-center justify-center space-x-4 mt-1 p-[5px] w-[100%]">
        <MagicButton text="Submit" htmlType='submit' loading={buttonLoading}/>
        </div>
    </Form>    
    )
}