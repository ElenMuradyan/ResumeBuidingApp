import ProfileSection from "@/components/resume/PersonalInfo";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function CreateResume () {
    return(
        <HeroHighlight className="w-[100%] h-[100vh]">
        <div className="flex w-[100%] items-center justify-center h-[100vh]">
            <div className="w-[50%]">
            <ProfileSection/>
            </div>
            <div className="w-[50%]">
            </div>
        </div>
        </HeroHighlight>
    )
}