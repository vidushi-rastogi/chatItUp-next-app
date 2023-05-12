import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ProfileImage = ({ currentUser, profileUser }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='mt-3'>
        Upload
      </div>
    </div>
  );
  
  return (
    currentUser === profileUser ? 
      <ImgCrop rotationSlider>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={onPreview}

      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            className='w-full'
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
    :
    <img
      src={imageUrl}
      alt="avatar"
      className='w-full'
    />
  );
};

export default ProfileImage;
