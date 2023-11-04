import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: <p style={{ width: "75px" }}>No</p>,
    dataIndex: "id",
    key: "id",
    render: (id, record, index) => {
      ++index;
      return index;
    },
  },
  {
    title: "Rating",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "Text",
    dataIndex: "text",
    key: "text",
  },
];

const SurveyAnswerTable = (props) => {
  const { answer } = props;

  return <Table columns={columns} dataSource={answer} />;
};
export default SurveyAnswerTable;
