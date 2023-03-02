import moment from "moment";
import _ from "lodash";
import "moment/locale/vi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MLogInRequired from "./MLogInRequired";
import ModalBooking from "./ModalBooking";
moment().format();

export default function ListTimeBooking(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { role } = useSelector((state) => state.user);

  const [today, setToday] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [openMLoginRequired, setOpenMLoginRequired] = useState(false);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    if (openMLoginRequired || schedule) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [openMLoginRequired, schedule]);

  async function handleBooking(item) {
    if (role !== "patient") {
      setOpenMLoginRequired(true);
    }
    if (role === "patient") {
      setSchedule(item);
    }
  }

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
                      onClick={() => {
                        handleBooking(item);
                      }}
                    >
                      {item.hour}
                    </button>
                  );
              })}
            </div>
          </>
        )}
        {_.last(props.schedules) &&
          props.date.getTime() === today.getTime() &&
          _.last(props.schedules).hour.split(":")[0] < moment().hour() && (
            <>
              {" "}
              <div className="justify-center flex bg-base-200 bg-base-200">
                <label htmlFor="date">
                  <a className="btn btn-warning ">Chưa có lịch trống</a>
                </label>
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
      {openMLoginRequired && (
        <MLogInRequired
          {...{
            openMLoginRequired,
            setOpenMLoginRequired,
            doctor: props.doctor,
          }}
        />
      )}
      {schedule && (
        <ModalBooking
          {...{
            doctor: props.doctor,
            clinic: props.clinic,
            schedule,
            setSchedule,
            service: props.service,
          }}
        />
      )}
    </>
  );
}
