import { resume } from "@/features/resume/types"; 
import { themeItems } from "@/lib/constants";
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function SidebarLeftTemplate({
  data,
  theme,
}: {
  data: resume;
  theme: themeItems;
}) {
  const {
    ProfileSection,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    ProjectSection,
    SocialSection,
  } = data;

  const { background, text, accent } = theme;

  return (
    <div
      id="resume-preview"
      className="grid grid-cols-3 max-w-5xl mx-auto shadow-md rounded-md overflow-hidden text-xs"
      style={{ backgroundColor: background, color: text }}
    >
      {/* SIDEBAR */}
      <div
        className="col-span-1 p-4 flex flex-col items-center text-center gap-2"
        style={{ backgroundColor: accent, color: background }}
      >
        {ProfileSection?.imgUrl && (
          <img
            src={ProfileSection.imgUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2"
            style={{ borderColor: background }}
          />
        )}
        <div>
          <h1 className="text-lg font-bold leading-tight">
            {ProfileSection?.firstName} {ProfileSection?.lastName}
          </h1>
          <p className="text-[11px] mt-0.5">{ProfileSection?.profession}</p>
        </div>

        <div className="text-[11px] leading-snug">
          <p>{ProfileSection?.address}</p>
          <p>{ProfileSection?.phoneNumber}</p>
        </div>

        {SocialSection && (
          <div className="flex gap-2 text-base mt-1">
            {SocialSection.linkedin && (
              <a href={SocialSection.linkedin} target="_blank" rel="noreferrer">
                <LinkedinOutlined />
              </a>
            )}
            {SocialSection.facebook && (
              <a href={SocialSection.facebook} target="_blank" rel="noreferrer">
                <FacebookOutlined />
              </a>
            )}
            {SocialSection.instagram && (
              <a href={SocialSection.instagram} target="_blank" rel="noreferrer">
                <InstagramOutlined />
              </a>
            )}
            {SocialSection.twitter && (
              <a href={SocialSection.twitter} target="_blank" rel="noreferrer">
                <TwitterOutlined />
              </a>
            )}
          </div>
        )}

        {SkillsSection?.length > 0 && (
          <div className="w-full text-left mt-4">
            <h2 className="font-semibold text-sm border-b pb-1 mb-1">Skills</h2>
            <ul className="text-[11px] list-disc list-inside leading-tight">
              {SkillsSection.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-2 p-4 space-y-4">
        {ProfileSection?.summary && (
          <section>
            <h2 className="text-base font-semibold" style={{ color: accent }}>
              Summary
            </h2>
            <p className="text-[11px] leading-snug">{ProfileSection.summary}</p>
          </section>
        )}

        {ExperienceSection?.length > 0 && (
          <section>
            <h2 className="text-base font-semibold" style={{ color: accent }}>
              Experience
            </h2>
            {ExperienceSection.map((exp, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-[12px] leading-tight">
                  {exp.position} — {exp.company}
                </p>
                <p className="text-[10px] italic mb-1">{exp.duration}</p>
                <p className="text-[11px] leading-snug">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {ProjectSection?.length > 0 && (
          <section>
            <h2 className="text-base font-semibold" style={{ color: accent }}>
              Projects
            </h2>
            {ProjectSection.map((proj, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-[12px] leading-tight">{proj.projectName}</p>
                <p className="text-[10px] italic mb-1">{proj.techStack}</p>
                <p className="text-[11px] leading-snug">{proj.description}</p>
                <a
                  href={proj.link}
                  className="text-[10px] underline"
                  style={{ color: accent }}
                >
                  View Demo
                </a>
              </div>
            ))}
          </section>
        )}

        {EducationSection?.length > 0 && (
          <section>
            <h2 className="text-base font-semibold" style={{ color: accent }}>
              Education
            </h2>
            {EducationSection.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-[12px] leading-tight">
                  {edu.courseName} — {edu.collegeSchool}
                </p>
                <p className="text-[10px] italic">
                  {edu.completitionYear} | {edu.percentage}%
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
