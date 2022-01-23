import logo from "../assets/logo.png";
import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

import "./responsive.css";

import { useResponsiveFontSize } from "react-responsive-font-size";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex, postData, setPostData } =
    useContext(GlobalContext);
  const myRef = useResponsiveFontSize(0.5, {
    setFontSize: true,
    globalVariableName: "--my-variable",
    lockFontSize: false,
  });
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleCurMonth() {
    setMonthIndex(dayjs().month());
  }

  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="flex">
        <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 mt-2 text-xl text-gray-500 fond-bold random">
          <span className="text-sky-600 hover:underline font-bold">my</span>{" "}
          <span className="font-bold">hair diary</span>
        </h1>
      </div>
      <div className="flex flex-row">
        <button
          className="border rounded py-2 px-4 mr-5"
          onClick={handleCurMonth}
        >
          Today
        </button>
        <div className="mt-2">
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="ml-4 text-xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM")}
        </div>
        <div className="ml-4 text-xl text-gray-500">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}
        </div>
      </div>
    </header>
  );
}
