import { useState } from "react";
import { Upload, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { checkFileType, getBase64, noop } from "../../helper";
import "./style.css";

function Index({ onUpload }) {
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, setImageUrl);
    onUpload(info.file);
  };

  const handleBeforeUpload = (file) =>
    checkFileType(
      file,
      ["image/jpg", "image/png", "image/jpeg"],
      "You can only upload JPG/PNG file!"
    );

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      customRequest={noop}
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}
      className="upload-area"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded image" className="uploaded-image" />
      ) : (
        <div style={{ width: "100%" }}>
          <InboxOutlined
            className="upload-icon"
            style={{ color: "#1890ff", fontSize: 36 }}
          />
          <div style={{ marginTop: 16 }}>
            <Typography.Title level={4}>
              Click or drag file to this area to upload
            </Typography.Title>
            <Typography.Text type="secondary">
              You can only upload JPG/JPEG/PNG file
            </Typography.Text>
          </div>
        </div>
      )}
    </Upload>
  );
}

export default Index;
