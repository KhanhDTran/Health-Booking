import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import PatientHeader from "../../../components/PatientHeader";
import Footer from "../../../components/Footer";
import { fetchBookings } from "../../../store/features/fetchDataSlice";
import Err401Page from "../../../components/Err401Page";
import BookingTable from "./BookingTable";
import { deleteRequestToast } from "../../../services/commonSv";
import moment from "moment";
import "moment/locale/vi";
moment().format();
import BookingLabTable from "./BookingLabTable";

export default function PatientBooking() {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.fetchData);

  useEffect(() => {
    document.title = "Lịch Hẹn Khám Bệnh";
    window.scrollTo(0, 0);
  }, []);

  // useState
  const [x, setX] = useState("");

  // UseEffect
  useEffect(() => {
    if (user) {
      dispatch(fetchBookings({ patient: user.patient._id }));
    }
  }, [user]);

  // function
  function a() {}

  async function cancleBooking(item) {
    if (
      confirm(
        `Có chắc muốn hủy lịch khám của ${item.doctor.name} vào giờ ${
          item.hour
        }, ngày ${moment(item.date).format("DD-MM-YYYY")} không? `
      )
    ) {
      console.log(item);
      let res = await deleteRequestToast(
        "/patient/delete-booking",
        {
          _id: item._id,
          hour: item.hour,
          date: item.date,
          patient: user.patient._id,
        },
        "Đang hủy lịch khám bệnh..."
      );
      if (res) dispatch(fetchBookings({ patient: user.patient._id }));
    }
  }

  async function cancleBookingLab(item) {
    console.log(item);
    if (
      confirm(
        `Có chắc muốn hủy lịch khám của ${item.lab.name} vào giờ ${
          item.hour
        }, ngày ${moment(item.date).format("DD-MM-YYYY")} không? `
      )
    ) {
      console.log(item);
      let res = await deleteRequestToast(
        "/patient/delete-booking",
        {
          _id: item._id,
          hour: item.hour,
          date: item.date,
          patient: user.patient._id,
        },
        "Đang hủy lịch khám bệnh..."
      );
      if (res) dispatch(fetchBookings({ patient: user.patient._id }));
    }
  }

  // console.log(bookings);

  return (
    <div>
      <PatientHeader />
      {role && role === "patient" ? (
        <div>
          <div className="container mx-auto m-4 min-h-screen">
            <div className="flex flex-col gap-4">
              <div className="flex w-full justify-center text-4xl">
                <span className="p-4 m-4">Lịch hẹn khám bệnh</span>
              </div>
              {/* -------- */}

              <div className="text-2xl">Phòng khám chuyên khoa</div>
              <BookingTable
                bookings={_.filter(bookings, (o) => {
                  return o.status === "Đang chờ khám" && o.clinic;
                })}
                cancleBooking={cancleBooking}
              />

              <div className="divider"></div>
              <div className="text-2xl">Phòng khám lâm sàng</div>

              <BookingLabTable
                bookings={_.filter(bookings, (o) => {
                  return o.lab;
                })}
                cancleBookingLab={cancleBookingLab}
              />

              {!bookings ||
                (_.isEmpty(bookings) && (
                  <div className="text-4xl flex justify-center h-96">
                    {" "}
                    <span>Không có lịch hẹn khám nào</span>{" "}
                  </div>
                ))}
              {/* -------- */}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Err401Page />
      )}
    </div>
  );
}
