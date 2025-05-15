import { resume } from "@/features/resume/types";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";

export const ResumePreview = ({ data }: { data: resume }) => {
  const {
    ProfileSection,
    ProjectSection,
    EducationSection,
    SkillsSection,
    SocialSection,
    ExperienceSection,
  } = data;  
  
  return (
    <div
      id="resume-preview"
      className="w-[800px] mx-auto p-10 bg-white text-black font-serif shadow-md"
    >
      {/* Image and Name Section */}
      <div className="flex items-center gap-6 mb-6">
        {ProfileSection.imgUrl && (
          <img
            src={ProfileSection.imgUrl}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">
            {`${ProfileSection.firstName} ${ProfileSection.lastName}`}
          </h1>
          <p className="text-gray-600">{ProfileSection.profession}</p>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b">Summary</h2>
        <p>{ProfileSection.summary}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold border-b">Experience</h2>
        {ExperienceSection?.map((item, i) => (
          <div key={i} className="mt-2">
            <p className="font-semibold">
              {item.position} at {item.company}
            </p>
            <p className="text-sm italic text-gray-500">{item.duration}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold border-b">Skills</h2>
        <ul className="list-disc pl-5">
          {SkillsSection?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold border-b">Education</h2>
        {EducationSection?.map((edu, i) => (
          <div key={i}>
            <p className="font-semibold">
              {edu.courseName} - {edu.collegeSchool}
            </p>
            <p className="text-sm text-gray-500">
              {edu.completitionYear} | {edu.percentage}%
            </p>
          </div>
        ))}
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold border-b">Projects</h2>
        {ProjectSection?.map((project, i) => (
          <div key={i} className="mt-2">
            <p className="font-semibold">{project.projectName}</p>
            <p className="text-sm italic text-gray-500">{project.techStack}</p>
            <p>{project.description}</p>
            <a className="text-blue-700" href={project.link}>View Demo</a>
          </div>
        ))}
      </section>

      {SocialSection && (
        <section className="mt-4">
          <h2 className="text-xl font-semibold border-b">Social</h2>
          <ul className="list-none pl-2 text-blue-700">
          <a href={SocialSection.instagram}><li><InstagramOutlined /> Instagram</li></a>
          <a href={SocialSection.linkedin}><li><LinkedinOutlined /> LinkedIn</li></a>
          <a href={SocialSection.facebook}><li><FacebookOutlined /> Facebook</li></a>
          <a href={SocialSection.twitter}><li><TwitterOutlined /> Twitter</li></a>
          </ul>
        </section>
      )}
    </div>
  );
};
