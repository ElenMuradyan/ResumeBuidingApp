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

    const items = resumes?.map((item, i) => {
            return(
                <Card data={item.data} key={i} id={item.id} summary={item.summary} date={item.date}/>
    )});

    return(
        <HeroHighlightDemo className='flex flex-col w-[100%] items-center justify-center gap-5 p-10'>
        <div className="pt-20 flex items-center justify-center flex-col">
            <TextGenerateEffect className="text-center" words="View and Edit Your Resumes"/>
            <div className="w-[90%] h-auto flex flex-wrap">
                <Carousel items={items as JSX.Element[]}/>
            </div>
        </div>
        </HeroHighlightDemo>
    )
}