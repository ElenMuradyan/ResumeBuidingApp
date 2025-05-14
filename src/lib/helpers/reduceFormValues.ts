import { education } from "@/features/resume/EducationSection/types";
import { FormInstance } from "rc-field-form";
import { FieldData } from "rc-field-form/lib/interface";

export function reduceFormValues (allFields: FieldData[]) {
    const data = allFields.reduce((acc: Record<string, any>, field: FieldData) => {
        acc[field.name[0]] = field.value || '';
        return acc;
    }, {});

    return data;
}

export function reduceEducationFormValues (data: education[], form?: FormInstance) {    
    const education = (data).reduce((acc: Record<string, string | number>, item, idx) => {
        acc[`courseName${idx}`] = item.courseName;
        acc[`completitionYear${idx}`] = item.completitionYear;
        acc[`collegeSchool${idx}`] = item.collegeSchool;
        acc[`percentage${idx}`] = item.percentage;

        return acc;
    }, {});

    form && form.setFieldsValue(education);
    return education;
}

export function extractEducationArray(fields: Record<string, any>): education[] {
    const result: Partial<education>[] = [];

    for (const key in fields) {
        const match = key.match(/^(\D+)(\d+)$/);
        if (!match) continue;

        const fieldKey = match[1] as keyof education;
        const index = parseInt(match[2]);

        if (!result[index]) result[index] = {};
        result[index][fieldKey] = fields[key];
    }

    return result as education[];
}