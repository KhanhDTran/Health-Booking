import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchScedules,
  fetchServices,
} from "../../../../store/features/fetchDataSlice";
import DatePicker from "react-datepicker";
import TableServices from "./TableServices";
import ListTimeBooking from "./ListTimeBooking";

export default function BookingClinicSec(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { schedules, services } = useSelector((state) => state.fetchData);

  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [selectService, setSelectService] = useState();

  useEffect(() => {
    if (services) setSelectService(services[0]);
  }, [services]);

  useEffect(() => {
    dispatch(fetchServices({ clinic: props.clinic._id }));
    dispatch(fetchScedules({ clinic: props.clinic._id, date }));
  }, [props.clinic]);

  function handleChangeDate(e) {
    setDate(e);
    dispatch(fetchScedules({ clinic: props.clinic._id, date: e }));
  }

  return (
    <>
      {props.clinic && (
        <div className="booking-section p-4 flex flex-col gap-4">
          <TableServices {...{ services, selectService, setSelectService }} />
          {/* ------------------*/}

          <div className="p-4 w-96 flex flex-col  gap-4 justify-center">
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
          {/* ---------------- */}

          <ListTimeBooking
            {...{
              schedules,
              clinic: props.clinic,
              date,
              doctor: props.doctor,
              service: selectService,
            }}
          />
        </div>
      )}
    </>
  );
}
