import { Upload, UploadFile } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ImgUploadProps } from "@/types/imageUpload";

const ImgUpload = ({ uploading, handleUpload, handleRemove, img }: ImgUploadProps) => {
    const uploadButton = (
        <button style={{ border: 0, background: 'none'}} type="button">
            {uploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div>Upload</div>
        </button>
    );

    const fileList: UploadFile[] = img ? [{
        uid: '-1', 
        name: 'photo.png',
        status: 'done', 
        url: img,  
    }] : [];

    return (
            <Upload
            fileList={fileList}
            customRequest={handleUpload}
            listType="picture-circle"
            onRemove={handleRemove}
            >
                {uploadButton}
            </Upload>
    )
}

export default ImgUpload;