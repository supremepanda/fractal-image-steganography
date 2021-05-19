import { Row, Col, Typography, Alert } from "antd";

import * as S from "./style";

const { Title, Paragraph, Link } = Typography;

function Index() {
  return (
    <Row style={{ marginBottom: 24 }}>
      <Col span={24}>
        <S.MainTitle>Fractal Image Steganography</S.MainTitle>
        <Title level={3}>Behind the Scene</Title>
        <Paragraph>
          App embeds message and key to the image. To encode, it changing the
          some pixels of image with the message and key pixels. To encode, it
          looking the key pixels and when it is find it decodes the message from
          it. To do that it converts all message, key and image information to
          binary format. For furthermore information please visit:&nbsp;
          <Link
            href="https://github.com/supremepanda/fractal-image-steganography#understanding-the-theory-of-backend-side"
            target="_blank"
          >
            here
          </Link>
        </Paragraph>
        <Alert
          message="How it works?"
          description="Select/Drag & Drop your image to decode or encode. Enter your `secret message`
          and `secret key` for encoding. And keep the `secret key` for decoding the message for later"
          type="info"
          showIcon
        />
      </Col>
    </Row>
  );
}

export default Index;
