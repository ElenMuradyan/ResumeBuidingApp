import { resume } from "@/features/resume/types";
import { themeItems } from "@/lib/constants";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function ModernTemplate({
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
      className="max-w-full bg-white mt-4 mx-auto shadow-md text-xs rounded-md font-sans overflow-hidden"
    >
      <div
        className="px-3 py-2 flex items-center gap-3"
        style={{ backgroundColor: background, color: text }}
      >
        {ProfileSection?.imgUrl && (
          <img
            src={ProfileSection.imgUrl}
            alt="Profile"
            className="w-12 h-12 object-cover rounded-full border border-white shadow-sm"
          />
        )}
        <div>
          <h1 className="text-sm font-bold">{`${ProfileSection?.firstName} ${ProfileSection?.lastName}`}</h1>
          <p className="text-[10px] text-gray-200">{ProfileSection?.profession}</p>
        </div>
      </div>

      <div className="p-4 text-gray-800">
        <section className="mb-3">
          <h2
            style={{ color: accent }}
            className="text-sm font-semibold border-b pb-1"
          >
            Summary
          </h2>
          <p className="mt-1">{ProfileSection?.summary}</p>
        </section>

        <section className="mb-3">
          <h2
            style={{ color: accent }}
            className="text-sm font-semibold border-b pb-1"
          >
            Experience
          </h2>
          {ExperienceSection?.map((item, i) => (
            <div key={i} className="mt-1.5">
              <p className="font-semibold">{item.position} at {item.company}</p>
              <p className="text-[10px] italic text-gray-500">{item.duration}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-3">
          <h2
            style={{ color: accent }}
            className="text-sm font-semibold border-b pb-1"
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-1 mt-2">
            {SkillsSection?.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] border border-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-3">
          <h2
            style={{ color: accent }}
            className="text-sm font-semibold border-b pb-1"
          >
            Education
          </h2>
          {EducationSection?.map((edu, i) => (
            <div key={i} className="mt-1.5">
              <p className="font-semibold">
                {edu.courseName} - {edu.collegeSchool}
              </p>
              <p className="text-[10px] text-gray-500">
                {edu.completitionYear} | {edu.percentage}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-3">
          <h2
            style={{ color: accent }}
            className="text-sm font-semibold border-b pb-1"
          >
            Projects
          </h2>
          {ProjectSection?.map((project, i) => (
            <div key={i} className="mt-1.5">
              <p className="font-semibold">{project.projectName}</p>
              <p className="text-[10px] italic text-gray-500">{project.techStack}</p>
              <p>{project.description}</p>
              <a
                href={project.link}
                style={{ color: accent }}
                className="text-[10px] underline"
              >
                View Demo
              </a>
            </div>
          ))}
        </section>

        {SocialSection && (
          <section className="mb-2">
            <h2
              style={{ color: accent }}
              className="text-sm font-semibold border-b pb-1"
            >
              Social
            </h2>
            <div className="flex flex-wrap gap-3 mt-2 text-[11px]" style={{ color: accent }}>
              {SocialSection.instagram && (
                <a href={SocialSection.instagram}>
                  <InstagramOutlined /> Instagram
                </a>
              )}
              {SocialSection.linkedin && (
                <a href={SocialSection.linkedin}>
                  <LinkedinOutlined /> LinkedIn
                </a>
              )}
              {SocialSection.facebook && (
                <a href={SocialSection.facebook}>
                  <FacebookOutlined /> Facebook
                </a>
              )}
              {SocialSection.twitter && (
                <a href={SocialSection.twitter}>
                  <TwitterOutlined /> Twitter
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
