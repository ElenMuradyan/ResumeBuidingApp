import { Rule } from "antd/es/form";
import { JSX } from "react";

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