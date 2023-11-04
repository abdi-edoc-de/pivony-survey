import { createSlice, createSelector } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
const initialState = {
  surveys: [],
  addSurveyLoading: false,
  addSurveyErrors: {},
  getSurveyLoading: false,
  getSurveyErrors: {},
  updateSurveyLoading: false,
  updateSurveyErrors: {},
};
const slice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    getSurvey: (survey, action) => {
      survey.surveys = action.payload;
      survey.getSurveyLoading = false;
    },
    getSurveyStart: (survey, action) => {
      survey.getSurveyLoading = true;
    },
    getSurveyFailed: (survey, action) => {
      survey.getSurveyErrors = action.payload;
    },
    addSurvey: (survey, action) => {
      survey.surveys.push(action.payload);
      survey.addSurveyLoading = false;
    },
    addSurveyStart: (survey, action) => {
      survey.addSurveyLoading = true;
    },
    addSurveyFailed: (survey, action) => {
      survey.addSurveyErrors = action.payload;
    },
    updateSurveyStart: (survey, action) => {
      survey.updateSurveyLoading = true;
    },
    updateSurveyFailed: (survey, action) => {
      survey.updateSurveyErrors = action.payload;
    },
    updateSurvey: (survey, action) => {
      const data = action.payload;
      survey.surveys = survey.surveys.map((item) => {
        if (item.id === action.payload.id) {
          data.answers = item.answers;
          return data;

        }
        return item;
      });

      survey.updateSurveyLoading = false;
    },
  },
});

export const {
  addSurvey,
  addSurveyFailed,
  addSurveyStart,
  getSurvey,
  getSurveyFailed,
  getSurveyStart,
  updateSurvey,
  updateSurveyStart,
  updateSurveyFailed,
} = slice.actions;

export default slice.reducer;

export const addSurveyApi = (data) => async (dispatch, getState) => {
  const surveyCollectionRef = collection(db, "survey");
  dispatch(addSurveyStart({}));
  try {
    data["answers"] = [];
    const docRef = await addDoc(surveyCollectionRef, data);
    const docSnap = await getDoc(doc(db, "myCollection", docRef.id));
    if (docSnap.exists()) {
      dispatch(addSurvey(docSnap.data()));
    } else {
      dispatch(addSurveyFailed({ error: "No such document!" }));
    }
  } catch (e) {
    dispatch(addSurveyFailed({ error: e.toString() }));
  }
};
export const updateSurveyApi = (data, id) => async (dispatch, getState) => {

  try {
    const surveyDoc = doc(db, "survey", id);
    const data1 = await updateDoc(surveyDoc, data);
    dispatch(updateSurvey({ ...data, id }));
  } catch (e) {
    dispatch(updateSurveyFailed({ error: e.toString() }));
  }
};
export const getSurveyApi = () => async (dispatch, getState) => {
  const surveyCollectionRef = collection(db, "survey");
  dispatch(getSurveyStart({}));
  try {
    const data = await getDocs(surveyCollectionRef);
    dispatch(
      getSurvey(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  } catch (e) {
    dispatch(getSurveyFailed({ error: e.toString() }));
  }
};
export const getSurveys = createSelector(
  (state) => {
    return state.entities.survey.surveys;
  },
  (surveys) => surveys
);
export const getSurveyById = (id) => createSelector(
  state => state.entities.survey.surveys.find(item => item.id + "" === id),
  survey => survey
);
