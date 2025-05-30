'use client'

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AppDispatch, RootState } from "@/state-management/store";
import { JSX, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { fetchUserResumes } from "@/features/resume/resumesSlice";
import { HeroHighlightDemo } from "@/components/HeroHighlightDemo";

export default function Resumes () {
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { resumes } = useSelector((state: RootState) => state.userResumes);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {        
        userData && dispatch(fetchUserResumes(userData.uid));
    }, [userData]);

    return(
        <HeroHighlightDemo className='flex flex-col h-auto w-[100%] items-center justify-center gap-5 p-10'>
            <TextGenerateEffect words="YOUR RESUMES" className="pt-20"/>
        <div className="w-[90%] items-center justify-center flex flex-wrap gap-20">
            {resumes?.map((item, i) => {
            return(
                <Card data={item.data} key={i} id={item.id} summary={item.summary} date={item.date}/>
    )})}
        </div>
        </HeroHighlightDemo>
    )
}