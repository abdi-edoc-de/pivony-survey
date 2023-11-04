import { combineReducers } from "@reduxjs/toolkit";
import survey from "./survey";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const surveyPersistConfig = {
  key: "survey 0.0",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["isLoading"],
};

export default combineReducers({
  survey: persistReducer(surveyPersistConfig, survey),
});
