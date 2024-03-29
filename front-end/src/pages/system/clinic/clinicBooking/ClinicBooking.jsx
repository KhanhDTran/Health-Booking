import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import ClinicHeader from "../../../../components/ClinicHeader";
import { putRequestToast } from "../../../../services/commonSv";
import { fetchBookings } from "../../../../store/features/fetchDataSlice";
import ClinicTablebooking from "./ClinicTablebooking";
moment().format();

export default function ClinicBooking() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.fetchData);
  const { user } = useSelector((state) => state.user);

  // useState
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  // console.log(bookings);

  // UseEffect
  useEffect(() => {
    document.title = "Lịch Hẹn Khám Bệnh";
    window.scrollTo(0, 0);
    dispatch(
      fetchBookings({ clinic: user.clinic._id, status: "Đang chờ khám", date })
    );
  }, []);

  // function
  function handleChangeDate(e) {
    setDate(e);
    dispatch(
      fetchBookings({
        clinic: user.clinic._id,
        status: "Đang chờ khám",
        date: e,
      })
    );
  }

  async function handleAdd(item) {
    let res = await putRequestToast(
      "/clinic/edit-booking-to-examining",
      {
        _id: item._id,
        query: {
          status: "Đang khám",
        },
      },
      `Đang chuyển sang "Đang khám bệnh"...`
    );
    if (res)
      dispatch(
        fetchBookings({ clinic: user.clinic._id, status: "Đang chờ khám" })
      );
  }

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
        <div className="w-full flex justify-center text-4xl p-10 m-10 text-3xl">
          Danh sách đang chờ khám
        </div>

        {bookings && bookings.length > 0 ? (
          <ClinicTablebooking
            bookings={_.sortBy(bookings, ["hour"])}
            handleAdd={handleAdd}
            status={"Đang chờ khám"}
          />
        ) : (
          <>Không có lịch hẹn hôm này</>
        )}
      </div>
    </>
  );
}
