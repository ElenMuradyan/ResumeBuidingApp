'use client'

import { useEffect, useState } from "react";
import { HeroHighlightDemo } from "./HeroHighlightDemo";
import MagicButton from "./ui/magic-button";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useRouter } from "next/navigation";
import { ROUTE_NAMES } from "@/lib/constants";
import { generateResumeId } from "@/lib/helpers/uniqueID";

export default function About () {
    const [ width, setWidth ] = useState<number>(0);
    const { push } = useRouter();

    useEffect(() => {
        const handleResize = () => window && setWidth(window.innerWidth);

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <div
        style={{
          backgroundImage: `url('/Images/bg.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className="h-[100vh] w-[100%]">
          <HeroHighlightDemo className='flex flex-col h-[100vh] w-[100%] items-center justify-center gap-10 p-10'>
            <TextGenerateEffect className='text-center text-[25px]' words='About Our Resume Builder'/>
            <p className='text-center'>    
                Our resume builder is designed to help you craft a professional, modern resume without the stress.
                Whether you're a student, freelancer, or job seeker, our intuitive platform allows you to easily 
                add your experiences, skills, and projects. Choose from clean templates, switch between dark and 
                light themes, and download your resume as a polished PDF — all in minutes. No sign-up. No hassle. Just results.
            </p>
              <MagicButton text='Create Resume' onClick={() => push(`${ROUTE_NAMES.CREATERESUME}/${generateResumeId()}`)}/>
          </HeroHighlightDemo>
        </div>
    )
}