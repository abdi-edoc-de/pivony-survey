import React from "react";
import { Card, Col, Row } from "antd";
import "../static/SurveyCard.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getSurveys } from "../store/survey";
const ListOfSurveys = () => {
  const surveys = useSelector((state) => getSurveys(state));
  return (
    <Row gutter={16}>
      {surveys.length === 0 ? (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h1>No Content</h1>
        </div>
      ) : (
        <>
          {surveys.map((item) => {
            return (
              <Col className="survey-card-col" span={8}>
                <Link to={`survey/${item.id}`}>
                  <Card
                    className="survey-card"
                    title={<h2>{item.name}</h2>}
                    bordered={false}
                  >
                    <p>
                      <strong>Grade Title :</strong> {item.grade_title}
                    </p>
                    <p>
                      <strong>Text Title :</strong> {item.text_title}
                    </p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </>
      )}
    </Row>
  );
};
export default ListOfSurveys;
