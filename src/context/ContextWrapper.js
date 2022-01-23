import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month() - 2);
  const [postData,setPostData] = useState({});
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex,postData,setPostData }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
