import React, { useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  InputNumber,
  Divider,
  Button,
  List,
  Flex,
  Typography,
} from "antd";
import { CopyBlock, ocean } from "react-code-blocks";
import "../static/SurveyCard.css";
import { useParams } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../static/DetailSurvey.css";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyById, updateSurveyApi } from "../store/survey";
import CopyGenerateCode from "../components/CopyGenerateCode";
import SurveyAnswerTable from "../components/SurveyAnswerTable";
const DetailSurvey = () => {
  const dispatch = useDispatch();
  const code = `<script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js">
</script><script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js">
</script><script src="YourFileName.js"></script>`;
  let { id } = useParams();
  const survey = useSelector(getSurveyById(id));
  const [form] = Form.useForm();
  const listOfEmbedCodeInstruction = [
    "1, Click the button to copy the survey code.",
    "2, Create 'YourFileName.js' in your project.",
    "3, Open the file and paste the code.",
    "4, Save the file.",
  ];
  const listOfInstruction = [
    "1. Open 'index.html' in your project.",
    "2. Copy the provided script tags.",
    "3. Paste them into 'index.html'.",
    "4. Replace 'YourFileName.js' in the third script's 'src' with your JavaScript filename.",
    "5. Save 'index.html'.",
  ];
  const handleSaveUpdate = () => {
    form
      .validateFields()
      .then(async (values) => {
        dispatch(updateSurveyApi(values, id));
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    form.setFieldsValue(survey);
  });
  return (
    <>
      {survey ? (
        <div className="detail-container">
          <Divider />
          <Form form={form} name="trigger" layout="vertical" autoComplete="off">
            <Row className="detail-row">
              <Col
                className="input-col"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  hasFeedback
                  label="Name"
                  name="name"
                  validateFirst
                  rules={[{ required: true }]}
                >
                  <Input placeholder=" Name" />
                </Form.Item>
              </Col>
              <Col
                className="input-col"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                {" "}
                <Form.Item
                  // hasFeedback
                  label="choose how much time to wait before showing the survey"
                  name="wait"
                  // validateTrigger="onBlur"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={1}
                    addonBefore={
                      <LeftOutlined
                        onClick={() => {
                          const currentValues = form.getFieldsValue();
                          if (
                            currentValues.wait === undefined ||
                            currentValues.wait === 0
                          ) {
                            return;
                          }
                          form.setFieldsValue({
                            wait: currentValues.wait - 1,
                          });
                        }}
                      />
                    }
                    addonAfter={
                      <RightOutlined
                        onClick={() => {
                          const currentValues = form.getFieldsValue();
                          if (currentValues.wait == undefined) {
                            return;
                          }
                          form.setFieldsValue({
                            wait: currentValues.wait + 1,
                          });
                        }}
                      />
                    }
                    // defaultValue={0}
                    placeholder="Seconds"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="detail-row">
              <Col
                className="input-col"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  // hasFeedback
                  label="choose how much time to show the survey"
                  name="times"
                  // validateTrigger="onBlur"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={1}
                    addonBefore={
                      <LeftOutlined
                        onClick={() => {
                          const currentValues = form.getFieldsValue();
                          if (
                            currentValues.times === undefined ||
                            currentValues.times === 0
                          ) {
                            return;
                          }
                          form.setFieldsValue({
                            times: currentValues.times - 1,
                          });
                        }}
                      />
                    }
                    addonAfter={
                      <RightOutlined
                        onClick={() => {
                          const currentValues = form.getFieldsValue();
                          if (currentValues.times === undefined) {
                            return;
                          }
                          form.setFieldsValue({
                            times: currentValues.times + 1,
                          });
                        }}
                      />
                    }
                    // defaultValue={0}
                    placeholder="Seconds"
                  />
                </Form.Item>
              </Col>
              <Col
                className="input-col"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                {" "}
                <Form.Item
                  hasFeedback
                  label="Grade Title"
                  name="grade_title"
                  validateFirst
                  rules={[{ required: true }]}
                >
                  <Input placeholder="grade title" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="detail-row">
              <Col
                className="input-col"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  //   hasFeedback
                  label="Display Frequency ~ every"
                  name="minutes"
                  //   validateFirst
                  rules={[{ required: true }]}
                >
                  <InputNumber placeholder="minutes" />
                </Form.Item>
                &nbsp;&nbsp; Other Options: 1 min, 5 min, 30 min
              </Col>
              <Col
                className="input-col"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                {" "}
                <Form.Item
                  hasFeedback
                  label="Text Title"
                  name="text_title"
                  validateFirst
                  rules={[{ required: true }]}
                >
                  <Input placeholder="text title" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Row justify={"end"}>
            <Button key="add" onClick={handleSaveUpdate} className="save-btn">
              Save
            </Button>
          </Row>
          <Divider />
          <Flex vertical gap="large">
            <h1>Instructions</h1>

            <div style={{ textAlign: "start" }}>
              <List
                header={
                  <div>
                    {" "}
                    <strong>1, Add Survey Code to Your Project </strong>
                  </div>
                }
                footer={<CopyGenerateCode id={id} />}
                dataSource={listOfEmbedCodeInstruction}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            </div>

            <div>
              <div style={{ textAlign: "start" }}>
                <List
                  header={
                    <div>
                      <strong>
                        2, Add necessary script tags in your index.html file
                      </strong>
                    </div>
                  }
                  footer={
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "5px",
                        textAlign: "start",
                      }}
                    >
                      <CopyBlock
                        text={code}
                        language={"html"}
                        theme={ocean}
                        showLineNumbers={true}
                      />
                    </div>
                  }
                  dataSource={listOfInstruction}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text mark></Typography.Text> {item}
                    </List.Item>
                  )}
                />
              </div>
            </div>
            <Divider />
            <div>
              <h1>Survey Answers Table</h1>
              <SurveyAnswerTable answer={survey.answers} />
            </div>
          </Flex>
        </div>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};
export default DetailSurvey;
