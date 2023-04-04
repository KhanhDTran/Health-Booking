import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import LabHeader from "../../../../components/LabHeader";
import { fetchBookings } from "../../../../store/features/fetchDataSlice";
import moment from "moment";
import "moment/locale/vi";
moment().format();
import DatePicker from "react-datepicker";
import LabTableBooking from "./LabTableBooking";
import { putRequestToast } from "../../../../services/commonSv";

export default function LabBooking() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.fetchData);

  // useState
  const [x, setX] = useState("");
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [listBookings, setListBookings] = useState([]);

  // UseEffect
  useEffect(() => {}, []);

  useEffect(() => {
    document.title = "Lịch Hẹn Khám Bệnh";
    dispatch(fetchBookings({ lab: user.lab._id, status: "Đang chờ khám" }));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (bookings) {
      let list = _.filter(bookings, (o) => {
        return (
          moment(o.date).format("DD-MM-YYYY") ===
          moment(date).format("DD-MM-YYYY")
        );
      });
      setListBookings(list);
    }
  }, [bookings]);

  function handleChangeDate(e) {
    setDate(e);
    let list = _.filter(bookings, (o) => {
      return (
        moment(o.date).format("DD-MM-YYYY") === moment(e).format("DD-MM-YYYY")
      );
    });
    setListBookings(list);
  }

  // function
  function a() {}

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
      dispatch(fetchBookings({ lab: user.lab._id, status: "Đang chờ khám" }));
  }

  //   console.log(bookings);

  return (
    <>
      <LabHeader />
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

        {listBookings && listBookings.length > 0 ? (
          <LabTableBooking
            bookings={_.sortBy(listBookings, ["hour"])}
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
