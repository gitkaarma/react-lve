import dayjs from "dayjs";
import React from "react";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import StarRatingComponent from "react-star-rating-component";
import Popup from "./Popup";
import "./Popup.css";
import { Rating } from "react-simple-star-rating";
import scissors from "../assets/scissors.png";
import rainbow from "../assets/rainbow.png";
import pr from "../assets/pr.png";
import sun from "../assets/sun.png";
import fat from "../assets/fat.png";

export default function Day({ day, rowIdx, colIdx }) {
  const { monthIndex, setMonthIndex, postData, setPostData } =
    useContext(GlobalContext);
  // postData is an array

  const [buttonPopup, setButtonPopup] = useState(false);
  function getCurrentDay() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  const mediaArr = getMediaArray();
  const starval = getrating();
  const distext = getText();
  const datee = parseInt(day.format("DD")) % 2 === 0 ? true : false;
  function getMediaArray() {
    for (let idx in postData) {
      var dateTime = postData[idx].calendardatetime;
      dateTime = dateTime.substr(0, 10);
      if (dateTime === day.format("YYYY-MM-DD")) {
        return postData[idx].media;
      }
    }
    return [];
  }

  function getrating() {
    for (let idx in postData) {
      var dateTime = postData[idx].calendardatetime;
      dateTime = dateTime.substr(0, 10);
      if (dateTime === day.format("YYYY-MM-DD")) {
        return postData[idx].rating;
      }
    }
    return 0;
  }

  function getText() {
    for (let idx in postData) {
      var dateTime = postData[idx].calendardatetime;
      dateTime = dateTime.substr(0, 10);
      if (dateTime === day.format("YYYY-MM-DD")) {
        return postData[idx].text;
      }
    }
    return "";
  }

  function getUrl() {
    if (mediaArr.length) {
      return mediaArr[0].mediaurl;
    }
  }

  function getbackcolor() {
    return colIdx === 0 ? "bg-gray-100 border-gray-200" : "border-gray-200";
  }

  return (
    <div className={`border flex flex-col ${getbackcolor()}`}>
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDay()} mb-0`}>
          {day.format("DD")}
        </p>
        <div>
          <StarRatingComponent
            name="rate"
            editing={false}
            renderStarIcon={() => <span className="star-rate">&#9733;</span>}
            starCount={starval}
            value={8}
          />
        </div>
        {mediaArr.length !== 0 && (
          <React.Fragment>
            <img
              className="h-30 w-20 mb-2"
              src={`${getUrl()}`}
              onClick={() => {
                setButtonPopup(true);
              }}
            ></img>
            <Popup
              trigger={buttonPopup}
              setTrigger={setButtonPopup}
              mediaArr={mediaArr}
            >
              {mediaArr.length !== 0 && (
                <img
                  className="pop-img"
                  src={`${getUrl()}`}
                  onClick={() => {
                    setButtonPopup(true);
                  }}
                ></img>
              )}
              <div className="total">
                <div className="middle">
                  <div className="legendcode">
                    {datee && (
                      <React.Fragment>
                        <img className="icons" src={scissors} alt="" />
                        <img className="icons" src={rainbow} alt="" />
                        <img className="icons" src={pr} alt="" />
                      </React.Fragment>
                    )}
                    {!datee && (
                      <React.Fragment>
                        <img className="icons" src={sun} alt="" />
                        <img className="icons" src={fat} alt="" />
                      </React.Fragment>
                    )}
                    {/* { && ()} */}
                  </div>
                  <div className="star">
                    <StarRatingComponent
                      name="rate"
                      editing={false}
                      renderStarIcon={() => (
                        <span className="star-rate">&#9733;</span>
                      )}
                      starCount={starval}
                      value={8}
                    />
                  </div>
                </div>
                <div className="head-date">
                  <h3> {day.format("DD MMMM")}</h3>
                </div>
                <div className="para">
                  <p>
                    Had an amazing hair cut and color from my styling today! My
                    curls have never felt so defined and voluminous.
                  </p>
                </div>
              </div>
              <hr className="solid"></hr>
              <p className="last">View Full Post</p>
            </Popup>
          </React.Fragment>
        )}
      </header>
    </div>
  );
}
