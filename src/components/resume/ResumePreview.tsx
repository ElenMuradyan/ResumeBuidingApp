// import { resume } from "@/features/resume/types";

// export const ResumePreview = ({ data }: {data: resume}) => {
//     const { ProfileSection, ProjectsSection, EducationSection, SkillsSection, SocialSecton, ExperienceSection} = data;
//     return (
//       <div id="resume-preview" className="w-[800px] mx-auto p-10 bg-white text-black font-serif shadow-md">
//         <h1 className="text-3xl font-bold border-b pb-2">{data.name}</h1>
//         <p className="text-gray-600">{data.profession}</p>
  
//         <section className="mt-6">
//           <h2 className="text-xl font-semibold border-b">Summary</h2>
//           <p>{data.ProfileSection.summary}</p>
//         </section>
  
//         <section className="mt-4">
//           <h2 className="text-xl font-semibold border-b">Experience</h2>
//           {data.ExperienceSection?.map((item, i) => (
//             <div key={i} className="mt-2">
//               <p className="font-semibold">{item.position} at {item.company}</p>
//               <p className="text-sm italic text-gray-500">{item.duration}</p>
//               <p>{item.description}</p>
//             </div>
//           ))}
//         </section>
  
//         <section className="mt-4">
//           <h2 className="text-xl font-semibold border-b">Skills</h2>
//           <ul className="list-disc pl-5">
//             {data.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
//           </ul>
//         </section>
  
//         <section className="mt-4">
//           <h2 className="text-xl font-semibold border-b">Education</h2>
//           {data.education?.map((edu, i) => (
//             <div key={i}>
//               <p className="font-semibold">{edu.degree} - {edu.institution}</p>
//               <p className="text-sm text-gray-500">{edu.year}</p>
//             </div>
//           ))}
//         </section>
//       </div>
//     );
//   };
  