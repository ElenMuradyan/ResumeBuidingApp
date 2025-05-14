import { ParamValue } from "next/dist/server/request/params";
import { userData } from "@/features/auth/types";
import { FieldData } from "rc-field-form/lib/interface";
import { FormInstance } from "rc-field-form";
import { Dispatch, SetStateAction } from "react";

export interface HandleRealTimeChangeParams {
    allFields: FieldData[];
    level: ParamValue;
    resumeId: ParamValue;
    userData: userData;
    push: (url: string) => void;
  }

  export interface education {
    courseName: string,
    completitionYear: number,
    collegeSchool: string,
    percentage: number
}

export interface handleAddInterface<T> {
    section: T[],
    setSection: Dispatch<SetStateAction<T[]>>,
    userData: userData | null,
    resumeId: ParamValue,
    form: FormInstance,
    level: ParamValue
}  

export interface project {
    projectName: string,
    techStack: string,
    description: string,
    link: string
}