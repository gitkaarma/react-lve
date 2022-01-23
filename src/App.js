import React, { useState, useContext, useEffect } from "react";
import "./App.css";

import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import SideBar from "./components/SideBar";
import GlobalContext from "./context/GlobalContext";
import axios from "axios";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  // read about useContext and useEffect
  const { monthIndex, setMonthIndex, postData, setPostData } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    const mango = {
      requestobjects: [
        {
          posts: {
            operationtype: "read",
            id: {
              return: true,
            },
            userid: {
              searchvalues: ["adbef521-7cf6-4344-af48-a9480df46549"],
              return: true,
            },
            iscalendarentry: {
              searchvalues: ["true"],
              return: true,
            },
            media: {
              return: true,
            },
            rating: {
              return: true,
            },
            text: {
              return: true,
            },
            privacy: {
              searchvalues: [18],
              return: true,
            },
            typeofday: {
              return: true,
            },
            calendardatetime: {
              return: true,
              sort: "descending",
            },
            maxitemcount: "20",

            continuationtoken: {
              sorton: "calendardatetime",
              token: `${dayjs(monthIndex).format("DD-MM-YYYY")}07:00:00`,
            },
            //continuationtoken: null,
          },
        },
      ],
    };
    axios
      .post("https://api.quinn.care/graph", mango)
      .then((res) => {
        setPostData(res.data.responseobjects[0].posts);
        console.log(res.data.responseobjects[0].posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [monthIndex]);
  return (
    <React.Fragment>
      <div className="h-screen flex flex-col w-screen">
        <CalendarHeader />
        {/* <InfiniteScroll
          dataLength={10}
          next={() => setMonthIndex(monthIndex + 1)}
          hasMore={true}
          className="flex flex-1 h-screen"
        > */}

        {<Month month={currentMonth} />}
        {/* </InfiniteScroll> */}
      </div>
    </React.Fragment>
  );
}

export default App;
