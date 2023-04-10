import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchScedules,
  fetchServices,
} from "../../../../store/features/fetchDataSlice";
import DatePicker from "react-datepicker";
import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
moment().format();
import {
  postRequestToast,
  putRequestToast,
} from "../../../../services/commonSv";
import TableServices from "../../../home/doctor/detailDoctor/TableServices";

export default function ModalReBooking(props) {
  const dispatch = useDispatch();

  const { schedules, services } = useSelector((state) => state.fetchData);
  const { role, user } = useSelector((state) => state.user);
  const [selectService, setSelectService] = useState();

  //   useState
  // console.log(props);
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [today, setToday] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [selectedHour, setSelectedHour] = useState(null);

  // useEffect
  useEffect(() => {
    dispatch(fetchScedules({ clinic: props.clinic._id, date }));
    dispatch(fetchServices({ clinic: props.clinic._id }));
  }, []);

  // function
  function a() {}

  async function b() {}

  function handleChangeDate(e) {
    setDate(e);
    dispatch(fetchScedules({ clinic: props.clinic._id, date: e }));
  }

  async function handleReBooking() {
    let res = await postRequestToast(
      "/patient/re-booking-clinic",
      {
        clinic: props.clinic._id,
        patient: user.patient._id,
        doctor: props.booking.doctor._id,
        preBooking: props.booking._id,
        hour: selectedHour.hour,
        date: date,
        services: [selectService._id],
        schedule: props.schedule,
        status: "Đang chờ khám",
      },
      "Đang tiến hành đặt lịch khám lại...."
    );
    if (res) {
      setSelectedHour(null);
      props.setOpenModalReBooking(false);
    }
  }

  //   console.log(props);

  return (
    <>
      <input
        type="checkbox"
        id="modal-re-booking-clinic"
        checked={props.openModalReBooking}
        onChange={props.setOpenModalReBooking}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-10/12 ">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setOpenModalReBooking(false);
              setSelectedHour(null);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Đăng ký khám lại</h3>
          <div className="divider"></div>

          {/* ---------------- */}
          <div className="min-h-full flex flex-col lg:flex-row gap-4 h-64">
            <div className="p-4 w-96 flex flex-col  gap-4 ">
              <label
                htmlFor="date"
                className="text-2xl w-40 hover:cursor-pointer"
              >
                Chọn ngày <i className="fa-solid fa-calendar"></i>
              </label>
              <DatePicker
                id="date"
                startDate={new Date(new Date().setHours(0, 0, 0, 0))}
                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                selected={date}
                onChange={(e) => handleChangeDate(e)}
                dateFormat="dd - MM - yyyy"
              />
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="flex flex-wrap gap-4 p-4 justify-center">
              {schedules &&
                schedules.length > 0 &&
                schedules.map((item) => {
                  if (
                    date.getTime() !== today.getTime() ||
                    (date.getTime() === today.getTime() &&
                      item.hour.split(":")[0] > moment().hour())
                  )
                    return (
                      <button
                        className={
                          item === selectedHour
                            ? "btn   btn-info w-32"
                            : "btn  btn-outline btn-info w-32"
                        }
                        key={item.hour}
                        onClick={() => {
                          if (selectedHour === item) setSelectedHour(null);
                          else {
                            setSelectedHour(item);
                          }
                        }}
                      >
                        {item.hour}
                      </button>
                    );
                })}
              {_.last(schedules) &&
                date.getTime() === today.getTime() &&
                _.last(schedules).hour.split(":")[0] < moment().hour() && (
                  <>
                    <div className="justify-center flex bg-base-200 bg-base-200">
                      <label htmlFor="date">
                        <a className="btn btn-warning ">Chưa có lịch trống</a>
                      </label>
                    </div>
                  </>
                )}
              {schedules && _.isEmpty(schedules) && (
                <div className="justify-center flex">
                  <label htmlFor="date">
                    <a className="btn btn-warning ">Chưa có lịch trống</a>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* ---------- */}
          <div className="divider"></div>
          <TableServices {...{ services, selectService, setSelectService }} />

          <div className="flex justify-center mt-10 bot-0 ">
            <button
              className="btn btn-info"
              onClick={handleReBooking}
              disabled={selectedHour && selectService ? false : true}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
