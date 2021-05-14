import { Row, Col, Typography, Alert } from "antd";

import * as S from "./style";

const { Title, Paragraph } = Typography;

function Index() {
  return (
    <Row style={{ marginBottom: 24 }}>
      <Col span={24}>
        <S.MainTitle>Fractal Image Steganography</S.MainTitle>
        <Title level={3}>How it works?</Title>
        <Paragraph>
          Lorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor
          Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit Amed Lorem
          Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit
          AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit Amed
        </Paragraph>
        <Alert
          message="Informational Notes"
          description="Lorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor
      Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit Amed"
          type="info"
          showIcon
        />
      </Col>
    </Row>
  );
}

export default Index;
