import { FormInstance } from "rc-field-form";
import { FieldData } from "rc-field-form/lib/interface";
import { isEducation, isExperoence, isProject } from "./typeDefine";

export function reduceFormValues (allFields: FieldData[]) {
    const data = allFields.reduce((acc: Record<string, any>, field: FieldData) => {
        acc[field.name[0]] = field.value || '';
        return acc;
    }, {});

    return data;
}

export function extractObject <T extends object>(data: T[], form?: FormInstance) {    
    const section = (data).reduce((acc: Record<string, string | number>, item, idx) => {
        if(isEducation(item)){
            acc[`courseName${idx}`] = item.courseName;
            acc[`completitionYear${idx}`] = item.completitionYear;
            acc[`collegeSchool${idx}`] = item.collegeSchool;
            acc[`percentage${idx}`] = item.percentage;    
        }else if (isProject(item)){
            acc[`projectName${idx}`] = item.projectName;
            acc[`techStack${idx}`] = item.techStack;
            acc[`description${idx}`] = item.description;
            acc[`link${idx}`] = item.link;    
        }else if(isExperoence(item)){
            acc[`position${idx}`] = item.position;
            acc[`company${idx}`] = item.company;
            acc[`description${idx}`] = item.description;
            acc[`duration${idx}`] = item.duration;    
        }

        return acc;
    }, {});

    form && form.setFieldsValue(section);
    return section;
}

export function extractArray<T>(fields: Record<string, any>): T[] {
    const result: any[] = [];

    for (const key in fields) {
        const match = key.match(/^(\D+)(\d+)$/);
        if (!match) continue;

        const fieldKey = match[1];
        const index = parseInt(match[2]);

        if (!result[index]) result[index] = {};
        result[index][fieldKey] = fields[key];
    }

    return result;
}