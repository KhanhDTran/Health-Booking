import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import ClinicHeader from "../../../components/ClinicHeader";
import DatePicker from "react-datepicker";
import { fetchBookings } from "../../../store/features/fetchDataSlice";
import ClinicTablebooking from "./ClinicTablebooking";

export default function ClinicBooking() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.fetchData);
  const { user } = useSelector((state) => state.user);

  // useState
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  console.log(bookings);

  // UseEffect
  useEffect(() => {
    dispatch(fetchBookings({ clinic: user.clinic._id }));
  }, []);

  // function
  function handleChangeDate(e) {
    setDate(e);
  }
  async function b() {}

  return (
    <>
      <ClinicHeader />
      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center text-3xl">
          Danh sách lịch hẹn khám bệnh
        </div>
        <div className="flex flex-col">
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
              selected={date}
              onChange={(e) => handleChangeDate(e)}
              dateFormat="dd - MM - yyyy"
            />
          </div>
        </div>

        <div className="divider"></div>
        <ClinicTablebooking bookings={bookings} />
      </div>
    </>
  );
}
