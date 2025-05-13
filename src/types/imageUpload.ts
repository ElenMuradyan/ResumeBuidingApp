export interface ImgUploadProps {
    handleUpload: (options: any) => void; 
    handleRemove: (file: any) => void;
    uploading: boolean;
    img: string
}