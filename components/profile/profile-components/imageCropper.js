import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Modal } from "antd";

function ImageCropper({ image, openModal, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <Modal 
        title="Crop your image"
        open={openModal}
        onOk={() => onCropDone(croppedArea)}
        okText="Done"
        onCancel={onCropCancel}
    >
      <div>
        <Cropper
          image={image}
          aspect={1/1}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
            },
          }}
        />
      </div>
    </Modal>
  );
}

export default ImageCropper;
