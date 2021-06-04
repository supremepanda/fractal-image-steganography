import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, message, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Upload from "../../components/Upload";
import { Type } from "./constants";

function Index({ type, title }) {
  const [form] = Form.useForm();

  const [file, setFile] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [encodedImage, setEncodedImage] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");

  useEffect(() => {
    form.resetFields();
    resetForm();
  }, [title]);

  const resetForm = () => {
    setLoading(false);
    setFile("");
    setDecodedMessage("");
    setEncodedImage("");
  };

  const onSubmit = async ({ secretKey, secretMessage }) => {
    setLoading(true);

    let endpoint = "/decode";

    const body = new FormData();

    body.append("file", file.originFileObj);
    body.append("secretKey", secretKey);

    if (type === Type.ENCODE) {
      body.append("secretMessage", secretMessage);
      endpoint = "/encode";
    }

    let response = await fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
      method: "POST",
      body,
    });

    response = await response.json();

    if (type === Type.ENCODE) {
      if (response.status) {
        const imageUrl = `data:image/png;base64,${response.data}`;
        setEncodedImage(imageUrl);
        message.success(`${file.name} file encoded successfully`, 3);
      } else {
        message.error(response.data, 3);
      }
    } else if (type === Type.DECODE) {
      if (response.status) {
        setDecodedMessage(response.data);
        message.success(`${file.name} file decoded successfully`, 3);
      } else {
        message.error(response.data, 3);
      }
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
                {
                  required: true,
                  message: "Please enter the secret message",
                },
                {
                  required: true,
                  message: "Please enter only ASCII characters",
                  pattern: /^[\x00-\x7F]*$/,
                },
              ]}
            >
              <Input
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
            rules={[
              {
                required: true,
                message: "Please enter the secret key",
              },
              {
                required: true,
                message: "Please enter only ASCII characters",
                pattern: /^[\x00-\x7F]*$/,
              },
            ]}
          >
            <Input
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
      {type === Type.ENCODE && encodedImage && (
        <Row justify="center">
          <Typography.Text>Image {type}d successfully.&nbsp;</Typography.Text>
          <Typography.Link href={encodedImage} download>
            Click to Download
          </Typography.Link>
        </Row>
      )}
      {type === Type.DECODE && decodedMessage && (
        <Row justify="center">
          <Typography.Text>Your secret message is:&nbsp;</Typography.Text>
          <Typography.Text style={{ wordBreak: "break-word" }} copyable mark>
            &nbsp;{decodedMessage}&nbsp;
          </Typography.Text>
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
