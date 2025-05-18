'use client'

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { realTimeDb } from "@/services/firebase/firebase";
import { AppDispatch, RootState } from "@/state-management/store";
import { get, ref } from "firebase/database";
import { JSX, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { ProfileSection, resume, SocialSection } from "@/features/resume/types";
import { extractArray } from "@/lib/helpers/reduceFormValues";
import { education, experience, project } from "@/features/resume/EducationSection/types";
import { fetchUserResumes } from "@/features/resume/ResumesSlice";

type Resume =  {
    id: string, 
    summary: string,
    date: string,
    data: resume
}

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
        <div className="pt-30 flex items-center justify-center flex-col">
            <TextGenerateEffect className="text-center" words="View and Edit Your Resumes"/>
            <div className="w-[90%] h-auto flex flex-wrap">
                <Carousel items={items as JSX.Element[]}/>
            </div>
        </div>
    )
}