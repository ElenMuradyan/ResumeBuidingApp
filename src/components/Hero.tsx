import { HeroHighlightDemo } from "./HeroHighlightDemo";
import MagicButton from "./ui/magic-button";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function Hero () {
    return(
        <div
        style={{
          backgroundImage: `url('/Images/bg.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className="h-[100vh] w-[100%]">
          <HeroHighlightDemo className='flex h-[100vh] w-[100%] items-center justify-center gap-10 p-10'>
          <div className='w-[50%] flex flex-col h-[100vh] items-center justify-center'>
            <TextGenerateEffect className='text-center text-[25px]' words='Build Your Resume in Minutes — Professionally & Effortlessly'/>
            <h4 className='text-center text-[20px]'>Your future job <span className='text-[#00ffdd]'>starts with a great resume — let&#39;s build it together</span></h4>
            <p className='text-center'>Create a modern, personalized resume with ease using our intuitive resume builder. Simply fill in your information, choose a design template, and preview your resume live — no design skills needed. Export your final resume as a PDF and get job-ready in just a few clicks. Fast, responsive, and free to use.</p>
              <MagicButton text='Create Resume'/>
          </div>
          <div className='w-[50%] flex h-[100vh] items-center justify-center'>
          <div
            style={{
              backgroundImage: `url('/Images/hero10.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            className="w-[500px] h-[500px]"
            />
          </div>
          </HeroHighlightDemo>
        </div>
  
    )
}