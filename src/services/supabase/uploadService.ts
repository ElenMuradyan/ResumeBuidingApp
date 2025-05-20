import { supabase } from "@/services/supabase/supabase";
import { RcFile } from "antd/es/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";

export const handleImageUpload = async (options: UploadRequestOption): Promise<string> => {
    try {
        const imageFile = options.file as RcFile;
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `resumeimages/${fileName}`;

        const { error } = await supabase.storage
            .from("resumeimages")
            .upload(filePath, imageFile);

        if (error) {
            options.onError?.(error); 
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from("resumeimages")
            .getPublicUrl(filePath);

        const imageUrl = publicUrlData.publicUrl;

        options.onSuccess?.(publicUrlData);

        return imageUrl;
    } catch (error: any) {
        const err = error as Error;
        options.onError?.(err);
        console.log(error.message);
        throw err;
    }
};