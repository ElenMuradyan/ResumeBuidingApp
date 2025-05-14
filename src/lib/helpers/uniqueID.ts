import { resId } from "@/types/generateResumeId";
import { ROUTE_NAMES } from "../constants";

export const generateResumeId = ({level, push}: resId) => {
    const timestamp = Date.now().toString(36); 
    const random = Math.random().toString(36).substring(2, 8);
    const id = `resume_${timestamp}_${random}`;
    push(`${ROUTE_NAMES.CREATERESUME}/${id}/${level}`);
};
  