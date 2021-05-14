import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Upload from "../../components/Upload";

function Index({ type, title }) {
  const onSubmit = (info) => {
    console.log("Submitted", info);
  };

  return (
    <Form name={`form-${title}`} onFinish={onSubmit} size="large">
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
        <Upload />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {title}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Index;
