import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import { fetchBookings } from "../../../../store/features/fetchDataSlice";
import LabTableBooking from "./LabTableBooking";
import LabHeader from "../../../../components/LabHeader";
import { putRequestToast } from "../../../../services/commonSv";

export default function LabExaminingList() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.fetchData);
  const { user } = useSelector((state) => state.user);

  // useState

  // UseEffect

  useEffect(() => {
    document.title = "Danh Sách Đang Khám";
    window.scrollTo(0, 0);
    dispatch(fetchBookings({ lab: user.lab._id, status: "Đang khám" }));
  }, []);

  // function

  async function handleMinus(item) {
    let res = await putRequestToast(
      "/clinic/edit-booking-to-pending",
      {
        _id: item._id,
        query: {
          status: "Đang chờ khám",
        },
      },
      `Đang chuyển sang "Đang chờ khám"...`
    );
    if (res)
      dispatch(fetchBookings({ lab: user.lab._id, status: "Đang khám" }));
  }

  return (
    <>
      <LabHeader />
      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center text-3xl">
          Danh sách bệnh nhân đang khám
        </div>

        <div className="divider"></div>
        {bookings && !_.isEmpty(bookings) ? (
          <>
            <LabTableBooking
              bookings={_.sortBy(bookings, ["date"], ["hour"])}
              handleMinus={handleMinus}
              status={"Đang khám"}
            />
          </>
        ) : (
          <>Hiện không có bệnh nhân đang khám</>
        )}
      </div>
    </>
  );
}
