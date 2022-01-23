import dayjs from "dayjs";
// utility library to easily manipulate time


export function getMonth(month = dayjs().month()){
        // month = current month
        const year = dayjs().year();
        const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
        //sunday(0), monday(1), tuesday(2)

        let currentMonthCount = 0 - firstDayOfTheMonth;

        const daysMatrix = new Array(5).fill([]).map(()=>{
                return new Array(7).fill(null).map(()=>{
                        currentMonthCount++;
                        return dayjs(new Date(year, month, currentMonthCount));
                })
        });
        return daysMatrix;
}