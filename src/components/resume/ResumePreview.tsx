'use client'

import { resume } from "@/features/resume/types";
import { themeItems, themes } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { templates } from "@/features/resume/resumeTemplates";

export const ResumePreview = ({ data }: { data: resume, width?: string }) => {
  const [ selectedTheme, setSelectedTheme ] = useState<keyof typeof themes>(data.theme || 'classic');
  const [ themeColors, setThemeColors ] = useState<themeItems>(themes[selectedTheme] || themes.classic);
  const [ demo, setDemo ] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    setThemeColors(themes[selectedTheme] || themes.classic);
  }, [selectedTheme]);

  useEffect(() => {
    setSelectedTheme(data.theme || 'classic');
  }, [data.theme]);

  useEffect(() => {
    setDemo(templates({data, theme: themeColors})[data.template]);
  }, [data, themeColors]);
console.log(data.template);

  return demo;
};