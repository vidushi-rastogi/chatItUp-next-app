import { Upload, message, notification } from 'antd';
import { useState, useEffect } from 'react';
import ImgCrop from 'antd-img-crop';

const popNotification = (type, message) => {
  notification[type]({
    message
  })
}

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

const updateProfileImage = async (imageUrl, username, setImageUrl) => {
  const res = await fetch('/api/updateUserData', {
    method: 'POST',
    body: JSON.stringify({
      username,
      field: 'profileImage',
      value: imageUrl
    })
  })
  if (res.status === 200) {
    popNotification('success', 'Profile image got updated successfully');
    setImageUrl(imageUrl);
  }
  else {
    popNotification('error', 'Failed to update profile image');
  }
}

const ProfileImage = ({ currentUser, profileUser, profileData }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (profileData) {
      setImageUrl(profileData.profileImage);
    }
  }, [profileData])

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, async (url) => {
        await updateProfileImage(url, profileUser, setImageUrl);
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
          <img
            src={imageUrl}
            alt="avatar"
            className='w-full'
          />
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
