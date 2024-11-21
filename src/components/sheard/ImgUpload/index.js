import { Upload, Progress, Flex } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

const ImgUpload = ({ progress, uploading, handleUpload, handleDelete }) => {
    const { firstName, lastName, uid } = useSelector(store => store.userProfile.userProfileInfo.userData);
    const { imgUrl } = useSelector(store => store.resumeInfo.resumeData.profileSection);
    const uploadButton = (
        <button style={{ border: 0, background: 'none'}} type="button">
            {uploading ? <Progress type="circle" percent={progress} size={70}/> : <PlusOutlined/>}
            <div style={{ marginTop: 8}}>Upload</div>
        </button>
    );

    let fieldList = imgUrl ? [{
        uid: uid,
        name: `${firstName} ${lastName}`,
        status: 'done',
        url: imgUrl
    }] : [];

    return (
        <Flex vertical>
                <Upload
                fileList={fieldList}
                customRequest={handleUpload}
                listType="picture-circle"
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                onRemove={handleDelete}
                >
        {!imgUrl && uploadButton}
        </Upload>
        </Flex>
    )
}

export default ImgUpload;