import { resume } from "@/features/resume/types";
import { themeItems } from "@/lib/constants";
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function CenteredCreativeTemplate({
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
      className="max-w-3xl mx-auto p-3 rounded-md shadow-md text-center text-xs"
      style={{ backgroundColor: background, color: text }}
    >
      {/* PROFILE */}
      {ProfileSection?.imgUrl && (
        <img
          src={ProfileSection.imgUrl}
          alt="Profile"
          className="w-20 h-20 mx-auto rounded-full border-2 mb-2"
          style={{ borderColor: accent }}
        />
      )}

      <h1 className="text-xl font-bold leading-tight">
        {ProfileSection?.firstName} {ProfileSection?.lastName}
      </h1>
      <p className="text-[11px] mb-1" style={{ color: accent }}>
        {ProfileSection?.profession}
      </p>

      <div className="mb-2 text-[11px] leading-snug">
        <p>{ProfileSection?.address}</p>
        <p>{ProfileSection?.phoneNumber}</p>
      </div>

      {SocialSection && (
        <div className="flex justify-center gap-3 mb-3 text-base" style={{ color: accent }}>
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

      {ProfileSection?.summary && (
        <p className="text-[11px] mb-3 leading-snug">{ProfileSection.summary}</p>
      )}

      {/* SECTIONS */}
      {SkillsSection?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-base font-semibold mb-1" style={{ color: accent }}>
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-1 text-[11px]">
            {SkillsSection.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 border rounded-full"
                style={{ borderColor: accent }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {ExperienceSection?.length > 0 && (
        <section className="mb-3 text-left">
          <h2 className="text-base font-semibold text-center mb-1" style={{ color: accent }}>
            Experience
          </h2>
          {ExperienceSection.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-[12px] leading-tight">
                {exp.position} — {exp.company}
              </p>
              <p className="text-[10px] italic mb-1" style={{ color: accent }}>
                {exp.duration}
              </p>
              <p className="text-[11px] leading-snug">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {ProjectSection?.length > 0 && (
        <section className="mb-3 text-left">
          <h2 className="text-base font-semibold text-center mb-1" style={{ color: accent }}>
            Projects
          </h2>
          {ProjectSection.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-[12px] leading-tight">{proj.projectName}</p>
              <p className="text-[10px] italic mb-1" style={{ color: accent }}>
                {proj.techStack}
              </p>
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
        <section className="text-left">
          <h2 className="text-base font-semibold text-center mb-1" style={{ color: accent }}>
            Education
          </h2>
          {EducationSection.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-[12px] leading-tight">
                {edu.courseName} — {edu.collegeSchool}
              </p>
              <p className="text-[10px] italic" style={{ color: accent }}>
                {edu.completitionYear} | {edu.percentage}%
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
