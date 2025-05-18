'use client'

import { resume } from "@/features/resume/types";
import { themes } from "@/lib/constants";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export const ResumePreview = ({ data, width = 'full' }: { data: resume, width?: string }) => {
  const {
    ProfileSection,
    ProjectSection,
    EducationSection,
    SkillsSection,
    SocialSection,
    ExperienceSection,
  } = data;  
  const [ selectedTheme, setSelectedTheme ] = useState<keyof typeof themes>(data.theme || 'classic');
  const [ themeColors, setThemeColors ] = useState(themes[selectedTheme] || themes.classic);

  useEffect(() => {
    setThemeColors(themes[selectedTheme] || themes.classic);
  }, [selectedTheme]);

  useEffect(() => {
    setSelectedTheme(data.theme || 'classic');
  }, [data.theme]);

  const { background, text, accent} = themeColors;

  return (
        <div
        id="resume-preview"
        className={`max-w-[${width}] bg-white mt-4 mx-auto font-serif shadow-md text-sm`}
        >
        <div 
            className="flex items-center p-4 gap-4 mb-4"
            style={{ backgroundColor: background, color: text }}
        >
            {ProfileSection?.imgUrl && (
            <img
                src={ProfileSection?.imgUrl}
                alt="Profile"
                className="w-16 h-16 object-cover rounded-full border border-gray-300"
            />
            )}
            <div>
            <h1 className="text-xl font-bold">
                {`${ProfileSection?.firstName} ${ProfileSection?.lastName}`}
            </h1>
            <p className="text-gray-600 text-sm">{ProfileSection?.profession}</p>
            </div>
        </div>

        <div className="w-full px-4 pb-6 bg-white text-black">
            <section className="mt-3">
            <h2 style={{ color: accent }} className="text-base font-semibold border-b">Summary</h2>
            <p>{ProfileSection?.summary}</p>
            </section>

            <section className="mt-3">
            <h2 style={{ color: accent }} className="text-base font-semibold border-b">Experience</h2>
            {ExperienceSection?.map((item, i) => (
                <div key={i} className="mt-1">
                <p className="font-semibold text-sm">
                    {item.position} at {item.company}
                </p>
                <p className="text-xs italic">{item.duration}</p>
                <p>{item.description}</p>
                </div>
            ))}
            </section>

            <section className="mt-3">
            <h2 style={{ color: accent }} className="text-base font-semibold border-b">Skills</h2>
            <p className="pl-5">
                {
                    SkillsSection?.join(", ")
                }
            </p>
            </section>

            <section className="mt-3">
            <h2 style={{ color: accent }} className="text-base font-semibold border-b">Education</h2>
            {EducationSection?.map((edu, i) => (
                <div key={i}>
                <p className="font-semibold">
                    {edu.courseName} - {edu.collegeSchool}
                </p>
                <p className="text-xs text-gray-500">
                    {edu.completitionYear} | {edu.percentage}%
                </p>
                </div>
            ))}
            </section>

            <section className="mt-3">
            <h2 style={{ color: accent }} className="text-base font-semibold border-b">Projects</h2>
            {ProjectSection?.map((project, i) => (
                <div key={i} className="mt-1">
                <p className="font-semibold">{project.projectName}</p>
                <p className="text-xs italic">{project.techStack}</p>
                <p>{project.description}</p>
                <a style={{ color: accent }} href={project.link}>View Demo</a>
                </div>
            ))}
            </section>

            {SocialSection && (
            <section className="mt-3">
                <h2 style={{ color: accent }} className="text-base font-semibold border-b">Social</h2>
                <ul className="list-none pl-2" style={{ color: accent }}>
                <a href={SocialSection.instagram}><li><InstagramOutlined /> Instagram</li></a>
                <a href={SocialSection.linkedin}><li><LinkedinOutlined /> LinkedIn</li></a>
                <a href={SocialSection.facebook}><li><FacebookOutlined /> Facebook</li></a>
                <a href={SocialSection.twitter}><li><TwitterOutlined /> Twitter</li></a>
                </ul>
            </section>
            )}
        </div>
        </div>
  );
};