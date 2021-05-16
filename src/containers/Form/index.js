import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, message, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Upload from "../../components/Upload";

function Index({ type, title }) {
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [resultImage, setResultImage] = useState("");

  useEffect(() => {
    form.resetFields();
    resetForm();
  }, [title]);

  const resetForm = () => {
    setLoading(false);
    setFile("");
    setResultImage("");
  };

  const onSubmit = async ({ secretKey, secretMessage }) => {
    setLoading(true);

    let endpoint = "/decode";

    const body = new FormData();

    body.append("file", file.originFileObj);
    body.append("secretKey", secretKey);

    if (type === "encode") {
      body.append("secretMessage", secretMessage);
      endpoint = "/encode";
    }

    let response = await fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
      method: "POST",
      body,
    });

    response = await response.json();

    if (type === "encode") {
      const imageUrl = `data:image/png;base64,${response.data}`;
      // const requestedImage = new Image();
      // requestedImage.src = imageUrl;
      // document.body.appendChild(requestedImage);
      setResultImage(imageUrl);

      // TODO: control status
      message.success(`${file.name} file encoded successfully`);
    } else if (type === "decode") {
      console.log({ response });

      // TODO: control status
      message.success(`${file.name} file decoded successfully`);
    }

    setLoading(false);
  };

  return (
    <Form name={`form-${title}`} onFinish={onSubmit} size="large" form={form}>
      <Row gutter={12}>
        {type === "encode" && (
          <Col span={12}>
            <Form.Item
              name="secretMessage"
              rules={[
                { required: true, message: "Please enter a secret message" },
              ]}
            >
              <Input.Password
                placeholder="Secret message"
                prefix={<InboxOutlined />}
                type="text"
              />
            </Form.Item>
          </Col>
        )}
        <Col span={type === "decode" ? 24 : 12}>
          <Form.Item
            name="secretKey"
            rules={[{ required: true, message: "Please enter the secret key" }]}
          >
            <Input.Password
              placeholder="Secret key"
              prefix={<InboxOutlined />}
              type="text"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="upload">
        <Upload onUpload={setFile} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          {title}
        </Button>
      </Form.Item>
      {resultImage && (
        <Row justify="center">
          <Typography.Text>Image {type}d successfully.&nbsp;</Typography.Text>
          <Typography.Link href={resultImage} download>
            Click to Download
          </Typography.Link>
        </Row>
      )}
    </Form>
  );
}

Index.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Index;
