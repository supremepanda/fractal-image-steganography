import { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

function Index() {
  const [fileList, setFileList] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [secretMessage, setSecretMessage] = useState("");

  const downloadImage = ({ thumbUrl, name }) => {
    const imageAnchor = document.createElement("a");

    imageAnchor.href = thumbUrl;
    imageAnchor.download = name;
    imageAnchor.click();
  };

  const uploadImage = async ({ file }) => {
    const body = new FormData();

    body.append("image", file);

    // body.append('secretKey', secretKey)
    // body.append('secretMessage', secretMessage)

    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/`, {
      method: "POST",
      body,
    });

    res = await res.json();

    // var image = new Image();
    // image.src = `data:image/png;base64,${res.type}`;
    // document.body.appendChild(image);

    message.success(`${file.name} file uploaded successfully`);

    setFileList(
      fileList.map((file) => {
        file.status = "done";
        file.url = file.thumbUrl;

        return file;
      })
    );

    return true;
  };

  const onChange = ({ fileList }) => setFileList(fileList);

  const props = {
    fileList,
    onChange,
    onPreview: downloadImage,
    name: "file",
    listType: "picture",
    customRequest: uploadImage,
  };

  return (
    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Upload.Dragger>
  );
}

export default Index;
