export const generateResumeId = () => {
    const timestamp = Date.now().toString(36); 
    const random = Math.random().toString(36).substring(2, 8);
    const id = `resume_${timestamp}_${random}`;
    return id;
};