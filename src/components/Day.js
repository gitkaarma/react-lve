import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import StarRatingComponent from "react-star-rating-component";

export default function Day({ day, rowIdx, colIdx }) {
  const { monthIndex, setMonthIndex, postData, setPostData } =
    useContext(GlobalContext);
  // postData is an array

  function getCurrentDay() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  const mediaArr = getMediaArray();
  const starval = getrating();
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
        <div className="">
          <StarRatingComponent
            name="rate"
            editing={false}
            renderStarIcon={() => <span>&#11088;</span>}
            starCount={starval}
            value={8}
          />
        </div>
        {mediaArr.length !== 0 && (
          <img
            className="h-30 w-20 mb-2"
            src={`${getUrl()}`}
            onClick={() => {
              alert("hello");
            }}
          ></img>
        )}
      </header>
    </div>
  );
}
