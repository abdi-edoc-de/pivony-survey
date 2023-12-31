import { useEffect } from "react";
import "./App.css";
import NewSurveyModal from "./components/NewSurveyModal";
import { Col, Layout, Row, Space, Image } from "antd";
const { Header, Content } = Layout;
import { useDispatch } from "react-redux";
import { getSurveyApi } from "./store/survey";
import Router from "./Router";
import { Link } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSurveyApi());
  }, []);
  return (
    <Space
      direction="vertical"
      style={{
        width: "80%",
        margin: "0 10%",
      }}
    >
      <Layout
        style={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Header className="header">
          <Row justify={"space-between"}>
            <Col className="col-btn">
              <Link to={`/`}>
                <Space className="header-logo-space">
                  <Image
                    className="logo-image"
                    width={150}
                    preview={false}
                    src="/logo.png"
                  ></Image>
                </Space>
              </Link>
            </Col>
            <Col className="col-btn">
              <NewSurveyModal />{" "}
            </Col>
          </Row>
        </Header>
        <Content className="content">
          <Router />
        </Content>
      </Layout>
    </Space>
  );
}

export default App;
