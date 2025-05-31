import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import CenteredCreativeTemplate from "@/components/templates/CenteredCreativeTemplate";
import SidebarLeftTemplate from "@/components/templates/SidebarLeftTemplate";
import { resume } from "./types";
import { themeItems } from "@/lib/constants";
import ClassicTemplatePDF from "@/components/templates/pdf/Classic";
import ModernTemplatePDF from "@/components/templates/pdf/Modern";
import ElegantTemplatePDF from "@/components/templates/pdf/Elegant";
import CenteredCreativeTemplatePDF from "@/components/templates/pdf/Centered";
import SidebarLeftTemplatePDF from "@/components/templates/pdf/SideBar";

export function templates ({data, theme}: {data: resume, theme: themeItems}) {
    const templatesObject = {
        ClassicTemplate: <ClassicTemplate data={data} theme={theme} />,
        ModernTemplate: <ModernTemplate data={data} theme={theme} />,
        ElegantTemplate: <ElegantTemplate data={data} theme={theme} />,
        CenteredCreativeTemplate: <CenteredCreativeTemplate data={data} theme={theme} />,
        SidebarLeftTemplate: <SidebarLeftTemplate data={data} theme={theme} />
    }    
    return templatesObject;
}

export type template = 'ClassicTemplate' | 'ModernTemplate' | 'ElegantTemplate' | 'CenteredCreativeTemplate' | 'SidebarLeftTemplate'

export function templatePDF ({data, theme}: {data: resume, theme: themeItems}) {
    const templatesObject = {
        ClassicTemplate: <ClassicTemplatePDF data={data} theme={theme} />,
        ModernTemplate: <ModernTemplatePDF data={data} theme={theme} />,
        ElegantTemplate: <ElegantTemplatePDF data={data} theme={theme} />,
        CenteredCreativeTemplate: <CenteredCreativeTemplatePDF data={data} theme={theme} />,
        SidebarLeftTemplate: <SidebarLeftTemplatePDF data={data} theme={theme} />
    }    
    return templatesObject;
}
