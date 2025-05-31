import { resume } from "@/features/resume/types";
import { ParamValue } from "next/dist/server/request/params";

export type themeType = { background: string; text: string; accent: string }

export type param = {
      resume: resume | null,
      resumeId: ParamValue,
      uid: string | undefined,
      push: (val: string) => void
}