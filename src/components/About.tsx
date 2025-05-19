import { HeroHighlightDemo } from "./HeroHighlightDemo";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function About () {
    return(
        <div
        className="h-[100vh] w-[100%]">
          <HeroHighlightDemo className='flex flex-col h-[100vh] w-[100%] items-center justify-center gap-10 p-10'>
            <TextGenerateEffect className='text-center text-[25px]' words='About Our Resume Builder'/>
            <p className='text-center'>    
                Our resume builder is designed to help you craft a professional, modern resume without the stress.
                Whether you're a student, freelancer, or job seeker, our intuitive platform allows you to easily 
                add your experiences, skills, and projects. Choose from clean templates, switch between dark and 
                light themes, and download your resume as a polished PDF — all in minutes. No sign-up. No hassle. Just results.
            </p>
          </HeroHighlightDemo>
        </div>
    )
}