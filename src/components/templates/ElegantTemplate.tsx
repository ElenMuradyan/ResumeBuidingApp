import { resume } from "@/features/resume/types";
import { themeItems } from "@/lib/constants";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function ElegantTemplate({
  data,
  theme,
}: {
  data: resume;
  theme: themeItems;
}) {
  const {
    ProfileSection,
    ProjectSection,
    ExperienceSection,
    SkillsSection,
    SocialSection,
    EducationSection,
  } = data;
  const { background, text, accent } = theme;

  return (
    <div
      id="resume-preview"
      className="max-w-5xl mx-auto my-4 rounded-md shadow-md grid grid-cols-3 text-xs"
      style={{ backgroundColor: background, color: text }}
    >
      {/* LEFT COLUMN */}
      <div className="col-span-1 p-4 border-r" style={{ borderColor: accent }}>
        {ProfileSection?.imgUrl && (
          <img
            src={ProfileSection?.imgUrl}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-3 border shadow-sm"
            style={{ borderColor: accent }}
          />
        )}

        <h1 className="text-sm font-bold text-center">
          {ProfileSection?.firstName} {ProfileSection?.lastName}
        </h1>
        <p className="text-center text-[10px] mb-3" style={{ color: accent }}>
          {ProfileSection?.profession}
        </p>

        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
            Contact
          </h2>
          <p className="text-xs">{ProfileSection?.address}</p>
          <p className="text-xs">{ProfileSection?.phoneNumber}</p>
        </div>

        {SkillsSection?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
              Skills
            </h2>
            <ul className="flex flex-wrap gap-1 text-[10px]">
              {SkillsSection.map((skill, i) => (
                <li
                  key={i}
                  className="px-1.5 py-0.5 border rounded"
                  style={{ borderColor: accent }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {SocialSection && (
          <div>
            <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
              Social
            </h2>
            <div className="space-y-1 text-[11px]" style={{ color: accent }}>
              {SocialSection.linkedin && (
                <a href={SocialSection.linkedin} className="block">
                  <LinkedinOutlined /> LinkedIn
                </a>
              )}
              {SocialSection.facebook && (
                <a href={SocialSection.facebook} className="block">
                  <FacebookOutlined /> Facebook
                </a>
              )}
              {SocialSection.instagram && (
                <a href={SocialSection.instagram} className="block">
                  <InstagramOutlined /> Instagram
                </a>
              )}
              {SocialSection.twitter && (
                <a href={SocialSection.twitter} className="block">
                  <TwitterOutlined /> Twitter
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-2 p-4">
        {ProfileSection?.summary && (
          <section className="mb-4">
            <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
              Profile
            </h2>
            <p className="text-xs">{ProfileSection.summary}</p>
          </section>
        )}

        {ExperienceSection?.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
              Work Experience
            </h2>
            {ExperienceSection.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-xs">
                  {exp.position} — {exp.company}
                </p>
                <p className="text-[10px] italic" style={{ color: accent }}>
                  {exp.duration}
                </p>
                <p className="text-xs">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {ProjectSection?.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
              Projects
            </h2>
            {ProjectSection.map((proj, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-xs">{proj.projectName}</p>
                <p className="text-[10px] italic" style={{ color: accent }}>
                  {proj.techStack}
                </p>
                <p className="text-xs">{proj.description}</p>
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
          <section className="mb-4">
            <h2 className="text-sm font-semibold mb-1" style={{ color: accent }}>
              Education
            </h2>
            {EducationSection.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-xs">
                  {edu.courseName} — {edu.collegeSchool}
                </p>
                <p className="text-[10px]" style={{ color: accent }}>
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
