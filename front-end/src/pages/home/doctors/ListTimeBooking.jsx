import moment from "moment";
import _ from "lodash";
import "moment/locale/vi";
import { useState, useEffect } from "react";

moment().format();

export default function ListTimeBooking(props) {
  const [today, setToday] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  return (
    <>
      <div>
        {props.schedules && props.schedules.length > 0 && (
          <>
            <div className=" bg-base-200 bg-base-200 h-96 overflow-y-scroll md:h-auto md:overflow-y-auto   flex flex-wrap gap-4 p-4 justify-center ">
              {props.schedules.map((item) => {
                if (
                  props.date.getTime() !== today.getTime() ||
                  (props.date.getTime() === today.getTime() &&
                    item.hour.split(":")[0] > moment().hour())
                )
                  return (
                    <button
                      className="btn  btn-outline btn-info w-32"
                      key={item.hour}
                      onClick={() => {}}
                    >
                      {item.hour}
                    </button>
                  );
              })}
            </div>
          </>
        )}
        {props.schedules && _.isEmpty(props.schedules) && (
          <div className="justify-center flex">
            <label htmlFor="date">
              <a className="btn btn-warning ">Chưa có lịch trống</a>
            </label>
          </div>
        )}
      </div>
    </>
  );
}
