import { Rule } from "antd/es/form";
import { ParamValue } from "next/dist/server/request/params";
import { JSX } from "react";
import { userData } from "@/features/auth/types";

export type formsType = Record<levelType, formType>

export interface formType {
    onFieldsChange: () => void,
    onFinish: () => void,
    formItems: formItemType[]
}

export interface formItemType {
    name: string,
    rules: { required?: boolean; message?: string; validator?: (rule: Rule, value: string) => Promise<void> }[],
    input: JSX.Element
}

export type levelType = 'ProfileSection' | 'EducationSection' | 'MiniProjects' | 'SocialLinks' | 'Skills'

  
export interface handleRemove {
    userData: userData, 
    resumeId: ParamValue, 
    setImgUrl: (val: string) => void
}