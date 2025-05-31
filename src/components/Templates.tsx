"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { templates } from "@/features/resume/resumeTemplates";
import { demoResume, themes } from "@/lib/constants";
import MagicButton from "./ui/magic-button";
import { ROUTE_NAMES } from "@/lib/Route_Names";
import { generateResumeId } from "@/lib/helpers/uniqueID";
import { useRouter } from "next/navigation";
import '@/styles/templates.css';
import { useSelector } from "react-redux";
import { RootState } from "@/state-management/store";

export function LampDemo() {
  const templatesObject = templates({ data: demoResume, theme: themes["classic"] });
  const { push } = useRouter();
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br pt-8 from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        SELECT RESUME <br /> TEMPLATE
      </motion.h1>

      <div className="w-full mt-10 mb-30 flex justify-center">
      <div className="flex flex-nowrap gap-10 justify-center items-start max-w-screen-xl w-[100%] overflow-auto custom-scrollbar">
      {Object.entries(templatesObject).map(([key, val], i) => (
      <div key={i} className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-semibold mb-2">{key}</h1>
        <div
          className="w-[400px] h-[600px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-md"
        >
          {val}
        </div>
        {
            userData && <MagicButton onClick={() => push(`${ROUTE_NAMES.CREATERESUME}/${generateResumeId(key, userData)}`)} text="Use Template"/>
        }
      </div>
    ))}
  </div>
</div>
    </LampContainer>
  );
}
