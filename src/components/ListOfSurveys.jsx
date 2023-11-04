import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import "../static/SurveyCard.css";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getSurveys } from "../store/survey";
const ListOfSurveys = () => {
  const surveyCollectionRef = collection(db, "survey");
  const [createSurveyLoading, setCreateSurveyLoading] = useState(false);
  const surveys = useSelector((state) => getSurveys(state));
  return (
    <Row gutter={16}>
      {surveys.map((item) => {
        return (
          <Col className="survey-card" span={8}>
            <Link to={`survey/${item.id}`}>
              <Card title={<h2>{item.name}</h2>} bordered={false}>
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
    </Row>
  );
};
export default ListOfSurveys;
