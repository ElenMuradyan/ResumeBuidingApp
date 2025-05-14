import EducationSection from "@/components/resume/EducationSection";
import ProfileSection from "@/components/resume/PersonalInfo";
import ProjectSection from "@/components/resume/ProjectsSection";
import SocialSection from "@/components/resume/SocialSection";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function CreateResume () {
    return(
        <HeroHighlight className="w-[100%] h-[100vh]">
        <div className="flex w-[100%] items-center justify-center h-[100vh]">
            <div className="w-[50%]">
            <SocialSection/>
            </div>
            <div className="w-[50%]">
            </div>
        </div>
        </HeroHighlight>
    )
}