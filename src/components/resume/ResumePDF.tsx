import { resume } from "@/features/resume/types";
import { themeType } from "@/types/resumeThemeTypes";
import { templatePDF } from "@/features/resume/resumeTemplates";
  
export default function ResumePDF ({ data, themeColors }: { data: resume, themeColors: themeType }) {
  const pdf = templatePDF({data, theme: themeColors})[data.template];
console.log(data.template);

  return pdf;
};