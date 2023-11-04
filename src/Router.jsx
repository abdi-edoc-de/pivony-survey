import { Routes, Route } from "react-router-dom";
import React from "react";
import ListOfSurveys from "./pages/ListOfSurveys";
import DetailSurvey from "./pages/DetailSurvey";
const Router = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<ListOfSurveys />} />
        <Route path="survey/:id" element={<DetailSurvey />} />

        <Route path="*" element={<NoPage />} />
      </Routes>{" "}
    </>
  );
};
const NoPage = (props) => {
  return <h1>404 Not Found</h1>;
};
export default Router;
