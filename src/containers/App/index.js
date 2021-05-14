import { useState } from "react";
import { Layout, Col, Row, Card, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import Welcome from "../Welcome";
import Form from "../Form";
import "./style.css";

const { Footer, Content } = Layout;

const tabListNoTitle = [
  {
    key: "0",
    tab: "Encode",
  },
  {
    key: "1",
    tab: "Decode",
  },
];

const contentListNoTitle = {
  0: <Form type="encode" title="Encode" />,
  1: <Form type="decode" title="Decode" />,
};

function App() {
  const [activePaneKey, setActivePaneKey] = useState(tabListNoTitle[0].key);

  return (
    <Layout style={{ minHeight: "100vh", paddingTop: 24 }}>
      <Content>
        <Row justify="center">
          <Col xxl={10} xl={14} lg={22} sm={22} xs={22}>
            <Welcome />
          </Col>
        </Row>
        <Row justify="center">
          <Col xxl={10} xl={14} lg={22} sm={22} xs={22}>
            <Card
              headStyle={{ paddingTop: 24, minHeight: 40 }}
              tabProps={{
                type: "card",
                animated: true,
                moreIcon: true,
              }}
              onTabChange={(key) => setActivePaneKey(key)}
              style={{ width: "100%" }}
              tabList={tabListNoTitle}
              activeTabKey={activePaneKey}
            >
              {contentListNoTitle[activePaneKey]}
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer>
        <Row justify="center">
          <Col>
            <Button
              type="link"
              href="https://github.com/supremepanda/fractal-image-steganography"
              target="_blank"
              style={{
                color: "initial",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GithubOutlined style={{ fontSize: 18 }} />
              See on Github
            </Button>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default App;
