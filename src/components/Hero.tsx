'use client'

import { useEffect, useState } from "react";
import { HeroHighlightDemo } from "./HeroHighlightDemo";
import MagicButton from "./ui/magic-button";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useRouter } from "next/navigation";
import { ROUTE_NAMES } from "@/lib/Route_Names";
import { generateResumeId } from "@/lib/helpers/uniqueID";
import { useSelector } from "react-redux";
import { RootState } from "@/state-management/store";

export default function Hero () {
    const [ width, setWidth ] = useState<number>(0);
    const { push } = useRouter();
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);

    useEffect(() => {
        const handleResize = () => window && setWidth(window.innerWidth);

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <div
        className="h-[100vh] w-[100%] flex flex-col md:flex-row items-center justify-center gap-10 p-10">
          <div className='w-full md:w-[50%] flex flex-col h-[100vh] items-center justify-center'>
            <TextGenerateEffect className='text-center text-[25px]' words='Build Your Resume in Minutes — Professionally & Effortlessly'/>
            <h4 className='text-center text-[20px]'>Your future job <span className='text-[#00ffdd]'>starts with a great resume — let&#39;s build it together</span></h4>
            <p className='text-center'>Create a modern, personalized resume with ease using our intuitive resume builder. Simply fill in your information, choose a design template, and preview your resume live — no design skills needed. Export your final resume as a PDF and get job-ready in just a few clicks. Fast, responsive, and free to use.</p>
              {
                userData && <MagicButton text='Create Resume' onClick={() => push(`${ROUTE_NAMES.CREATERESUME}/${generateResumeId('ClassicTemplate', userData)}`)}/>
              }
          </div>
          {
            width >= 768 &&           
            <div className='w-[50%] flex h-[100vh] items-center justify-center'>
                <div
                style={{
                    backgroundImage: `url('/Images/hero.png')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
                className="w-[500px] h-[500px]"
                />
            </div>
          }
        </div>
    )
}