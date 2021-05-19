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
        We convert the text to char and the image to RGB format to embed the text in the picture.
        By giving a secret key to the end of the data to be stored, we decide where the data will end.
        In this way, we can embed the text in the picture.
        To decode the picture and read the text in it, it will be enough to know the secret key.
        </Paragraph>
        <Alert
          message="Informational Notes"
          description="We first need to select an image.
                      Then we must enter out message into 'Secret Message' input.
                      Finally we must determine a 'Secret Key' and click on the Encode button.
                      To Decode our image, firstly we must pick a picture which has a secret message in it. After that we just need to enter 'Secret Key' and click on Decode button."
          type="info"
          showIcon
        />
      </Col>
    </Row>
  );
}

export default Index;
