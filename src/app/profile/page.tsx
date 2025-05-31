'use client'
import { HeroHighlightDemo } from '@/components/HeroHighlightDemo';
import ProfileForm from '@/components/profile';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [ width, setWidth ] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => window && setWidth(window.innerWidth);

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen w-full overflow-hidden">
        <HeroHighlightDemo className="flex flex-col md:flex-row items-center justify-center gap-10 p-6 md:p-10">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center space-y-4">
            {width >= 786 && (
                <>
                <h1 className='text-[30px] m-0'>Profile Details</h1>
                <TextGenerateEffect
                className="text-[22px] md:text-[25px] leading-relaxed"
                words="Here you can view and update your personal information — make changes to your name, contact details, experience, and more. Keep your profile up to date to ensure your resume reflects your latest achievements."
                />
                </>
            )}
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center">
            <ProfileForm />
            </div>
        </HeroHighlightDemo>
        </div>
    )
};

export default Profile;