import React from "react";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const CopyGenerateCode = (props) => {
  const { id } = props;

  return (
    <Button
      style={{
        backgroundColor: "transparent",
        color: "rgb(192, 121, 233)",
        border: "1px solid rgba(192, 121, 233, 0.3)",
        // boxShadow: "none",
      }}
      icon={<CopyOutlined />}
      onClick={() =>
        navigator.clipboard.writeText(`const id = "${id}";
        var clickedValue;
let times;
let count = 0;
let freq;
let ratingTitleContent;
let textTitleContent;
createTheModal();
const firebaseConfig = {
  apiKey: "AIzaSyAZvZ45WR_swb4YhmLBj0KNbbBy1sx0mgw",
  authDomain: "pivony-survey.firebaseapp.com",
  projectId: "pivony-survey",
  storageBucket: "pivony-survey.appspot.com",
  messagingSenderId: "541409215681",
  appId: "1:541409215681:web:98a4cfa8dce462a434c040",
  measurementId: "G-J7SDS1TS0H",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

getSurveys();
const modal = document.getElementById("myModal");
const nextBtn = document.querySelector(".next-btn");
const sendBtn = document.querySelector(".send-btn");
const ratingBody = document.querySelector(".survey-popup-ratings-container");
const textBody = document.querySelector(".survey-popup-text");
const ratingTitle = document.querySelector(".rating-title");
const textTitle = document.querySelector(".text-title");
const textForm = document.querySelector("#text-form");
const listItems = document.querySelectorAll(".survey-popup-ratings-num li");
for (var i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener("click", function (event) {
    removeActive();
    event.target.style.backgroundColor = "blue";
    event.target.style.opacity = "0.5";
    event.target.style.color = "white";
    clickedValue = event.target.textContent;
  });
}

async function getSurveys() {
  const surveyRef = db.collection("survey").doc(id);
  const surveyDoc = await surveyRef.get();
  if (!surveyDoc.exists) {
    getSurveys();
  }
  const surveyData = surveyDoc.data();
  times = surveyData.times;
  const wait = surveyData.wait * 1000;
  freq = surveyData.minutes * 1000;
  ratingTitleContent = surveyData.grade_title;
  textTitleContent = surveyData.text_title;
  ratingTitle.textContent = ratingTitleContent;
  textTitle.textContent = textTitleContent;


  if (count < times) {
    count++;
    setTimeout(() => {
      modal.style.display = "block";
    }, wait);
  }
}

async function updateSurvey(grade, text) {
  const surveyRef = db.collection("survey");
  const surveySnapshot = await surveyRef.doc(id);
  const surveyDoc = await surveySnapshot.get();
  if (!surveyDoc.exists) {
    console.log("No such document!");
    return ;
  } 
  const surveyData = surveyDoc.data();
  const answerList = [...surveyData.answers, { grade: grade, text: text }];
  await surveySnapshot.update({ answers: answerList });
}

function removeActive() {
  listItems.forEach(function (item) {
    item.style.backgroundColor = "white";
    item.style.color = "#6b6b6b";
  });
}

textForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (event.submitter.name === "send") {
    await updateSurvey(clickedValue, event.target[0].value);
    showRatingPopUp();
    clickedValue = null;
    textForm.reset();
    modal.style.display = "none";
    removeActive();
    if (count < times) {
      showModal();
    }
  }
});

function showTextPopUp() {
  nextBtn.style.display = "none";
  sendBtn.style.display = "block";
  ratingBody.style.display = "none";
  textBody.style.display = "flex";
  ratingTitle.style.display = "none";
  textTitle.style.display = "block";
}
function showRatingPopUp() {
  nextBtn.style.display = "block";
  sendBtn.style.display = "none";
  ratingBody.style.display = "block";
  textBody.style.display = "none";
  ratingTitle.style.display = "block";
  textTitle.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  if (clickedValue) {
    showTextPopUp();
  }
  // showRatingPopUp();
});

function createTheModal() {
  const modal = document.createElement("div");
  modal.id = "myModal";
  modal.classList.add("modal");
  modal.innerHTML = \`<div class="modal-content">
        <div class="survey-popup-header">
          <div class="survey-popup-title">
            <p class="rating-title">
            </p>
            <p class="text-title">
            </p>
          </div>
          <div class="survey-popup-icon">
            <span><i class="fi fi-rr-badge-check"></i> </span>
          </div>
        </div>
        <form id="text-form" action="">
          <div class="survey-popup-body">
            <div class="survey-popup-ratings-container">
              <div class="survey-popup-ratings">
                <ul class="survey-popup-ratings-num">
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                </ul>
              </div>
              <div class="survey-popup-label">
                <p>not likely</p>
                <p>very likely</p>
              </div>
            </div>
      
            <div class="survey-popup-text">
              <textarea type="reset" name="text_area" placeholder="Free Text Area" rows="6"></textarea>
            </div>
          </div>
          <div class="survey-popup-footer">
            
            <button type="submit" name="send" required class="send-btn">
              Send &nbsp;&nbsp; >
            </button>
          </form>
          <button class="next-btn" name="next">Next &nbsp;&nbsp; ></button>
      
          </div>
      </div>\`;
  document.body.appendChild(modal);

  var style = document.createElement("style");
  style.textContent = \`
      
        /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 15%; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        font-family: Arial, sans-serif;
      }
      
      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        border: 1px solid #d3d3d3;
        width: 470px;
      }
      
      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      
      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      
      .rating-title {
        display: block;
      }
      .text-title {
        display: none;
      }
      
      .survey-popup-text {
        width: 100%;
        display: none;
        justify-content: center;
      }
      .survey-popup-text textarea {
        width: 75%;
        margin: 5% 0;
        border: 2px solid #d3d3d3;
        resize: none;
        border-radius: 3px;
      }
      .send-btn {
        display: none;
      }
      .survey-popup-footer button {
        padding: 5px 20px;
        margin: 10px 20px;
        border-radius: 5px;
        border: 2px solid #9f9f9f;
        color: #1d8af0;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        transition-duration: 0.4s;
      }
      .survey-popup-footer button:hover {
        background-color: rgba(163, 208, 253, 0.7);
      }
      .survey-popup-footer {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 0;
        border: 1px solid #d3d3d3;
      }
      .survey-popup-label {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 0 auto 5% auto;
        padding: 0;
        color: #6b6b6b;
      }
      .survey-popup-body {
        justify-content: center;
        align-items: center;
        border: 1px solid #d3d3d3;
      }
      .survey-popup-ratings {
        margin-top: 12%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .survey-popup-ratings-num {
        width: 90%;
        display: flex;
        justify-content: space-evenly;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .survey-popup-ratings-num li {
        border: 2px solid #6b6b6b;
        color: #6b6b6b;

        border-radius: 5px;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
      }
      .survey-popup-title {
        width: 90%;
        justify-content: space-evenly;
        display: flex;
        align-self: center;
      }
      .survey-popup-title p {
        padding: 0;
        margin: 0;
        width: 80%;
        font-size: 15px;
        font-weight: bold;
      }
      .survey-popup-icon i {
        display: flex;
        align-items: center;
        padding: 7px 7px;
      }
      .survey-popup-icon {
        padding: 0;
        margin: 0;
        background-color: #1d8af0;
        font-size: 40px;
        align-items: center;
        display: flex;
        width: 12%;
        justify-content: center;
      }
      .survey-popup-header {
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin: 0;
        border: 1px solid #d3d3d3;
      }
      \`;

  document.head.appendChild(style);
  var link1 = document.createElement("link");
  var link2 = document.createElement("link");

  // Set the attributes of the first link element
  link1.rel = "stylesheet";
  link1.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";
  link1.integrity =
    "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==";
  link1.crossOrigin = "anonymous";
  link1.referrerPolicy = "no-referrer";

  // Set the attributes of the second link element
  link2.rel = "stylesheet";
  link2.href =
    "https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css";

  // Append the link elements to the head of the document
  document.head.appendChild(link1);
  document.head.appendChild(link2);
}

function showModal() {
  setTimeout(() => {
    modal.style.display = "block";
  }, 10000);
  count++;
}

        `)
      }
      type="primary"
      block
    >
      Copy Embedded Survey Code
    </Button>
  );
};
export default CopyGenerateCode;
