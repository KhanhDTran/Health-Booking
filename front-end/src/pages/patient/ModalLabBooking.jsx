import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScedules } from "../../store/features/fetchDataSlice";
import DatePicker from "react-datepicker";
import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
moment().format();
import { putRequestToast } from "../../services/commonSv";

export default function ModalLabBooking(props) {
  const dispatch = useDispatch();

  const { schedules } = useSelector((state) => state.fetchData);

  //   useState
  console.log(props.selectedLab);
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [today, setToday] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [selectedHour, setSelectedHour] = useState(null);

  // useEffect
  useEffect(() => {
    dispatch(fetchScedules({ lab: props.selectedLab._id, date }));
  }, []);

  useEffect(() => {
    dispatch(fetchScedules({ lab: props.selectedLab._id, date }));
  }, [props.selectedLab]);

  // function
  function a() {}

  async function b() {}

  function handleChangeDate(e) {
    setDate(e);
    dispatch(fetchScedules({ lab: props.selectedLab._id, date: e }));
  }

  async function handleLabBooking() {
    let res = await postRequestToast(
      "/patient/create-booking",
      {
        clinic: props.clinic._id,
        patient: user.patient._id,
        doctor: props.doctor._id,
        services: [props.service._id],
        schedule: props.schedule,
        status: "Đang chờ khám",
      },
      "Đang tiến hành đặt lịch...."
    );
    setSelectedHour(null);
    props.setOpenModalBooking(false)
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-booking-lab"
        checked={props.openModalBooking}
        onChange={props.setOpenModalBooking}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-10/12 ">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setOpenModalBooking(false);
              setSelectedHour(null);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Đăng ký khám lâm sàng</h3>
          <div className="divider"></div>

          <div className="flex flex-col">
            <div className="avatar">
              <div className=" h-28 w-28 ">
                <img
                  className="mask mask-circle bg-base-200 h-36 w-36 hover:cursor-pointer"
                  src={props.selectedLab.image}
                />
              </div>
            </div>
            <p>{props.selectedLab.name}</p>
            <p>
              <b>Phòng:</b> {props.selectedLab.room}
            </p>
            <p>
              <b>Địa chỉ:</b> {props.selectedLab.address},{" "}
              {props.selectedLab.province}
            </p>
            <p>
              <b>Mổ tả:</b> {props.selectedLab.description}
            </p>
          </div>

          <div className="divider"></div>

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

          <div className="flex justify-center mt-10 bot-0 ">
            <button
              className="btn btn-info"
              onClick={handleLabBooking}
              disabled={selectedHour ? false : true}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
