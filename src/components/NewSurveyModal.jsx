import React, { useEffect, useState } from "react";
import { Button, Modal, Divider, InputNumber, Form, Input } from "antd";
import "../static/NewSurveyModal.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { addSurveyApi, getSurveyApi } from "../store/survey";
import { useDispatch } from "react-redux";
const NewSurveyModal = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSurveyLoading, setCreateSurveyLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const handleAdd = () => {
    setCreateSurveyLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        dispatch(addSurveyApi(values));
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((err) => {});
    setCreateSurveyLoading(false);
    dispatch(getSurveyApi());
  };
  useEffect(() => {
    dispatch(getSurveyApi());
  }, []);
  return (
    <>
      <Button className="modal-btn" onClick={showModal}>
        Add New Survey
      </Button>
      <Modal
        className="modal"
        title={<p>Set up Configuration</p>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            loading={createSurveyLoading}
            disabled={createSurveyLoading}
            key="add"
            className="create-btn"
            onClick={handleAdd}
          >
            Create
          </Button>,
        ]}
      >
        <div className="modal-body">
          <Divider />
          <Form
            form={form}
            name="trigger"
            style={{ maxWidth: 600 }}
            layout="vertical"
            autoComplete="off"
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
            <Form.Item
              label="choose how much time to wait before showing the survey"
              name="wait"
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
                placeholder="Seconds"
              />
            </Form.Item>
            <Form.Item
              label="choose how much time to show the survey"
              name="times"
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

            <Form.Item
              hasFeedback
              label="Display Frequency ~ every"
              name="minutes"
              validateFirst
              rules={[{ required: true }]}
            >
              <InputNumber min={1} placeholder="minutes" />
            </Form.Item>
            <p> &nbsp;&nbsp; Other Options: 1 min, 5 min, 30 min</p>
            <Form.Item
              hasFeedback
              label="Grade Title"
              name="grade_title"
              validateFirst
              rules={[{ required: true }]}
            >
              <Input placeholder="grade title" />
            </Form.Item>
            <Form.Item
              hasFeedback
              label="Text Title"
              name="text_title"
              validateFirst
              rules={[{ required: true }]}
            >
              <Input placeholder="text title" />
            </Form.Item>
          </Form>
          <Divider />
        </div>
      </Modal>
    </>
  );
};
export default NewSurveyModal;
