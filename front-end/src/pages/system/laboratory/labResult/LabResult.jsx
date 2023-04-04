import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import LabHeader from "../../../../components/LabHeader";
import {
  fetchBookings,
  fetchResults,
} from "../../../../store/features/fetchDataSlice";
import { useParams } from "react-router-dom";
import PatientResultInfo from "./PatientResultInfo";

export default function LabResult() {
  const dispatch = useDispatch();
  // useState
  const params = useParams();
  const { booking_id, record_id } = params;
  const { user } = useSelector((state) => state.user);
  const { results, bookings } = useSelector((state) => state.fetchData);

  // UseEffect

  useEffect(() => {
    document.title = "Kết Quả Khám";
    dispatch(fetchBookings({ _id: booking_id }));
    dispatch(fetchResults({ record: record_id, lab: user.lab._id }));
    window.scrollTo(0, 0);
  }, []);

  // function
  function a() {}

  async function b() {}

  console.log(booking_id);

  return (
    <div>
      <LabHeader />
      <div className="container mx-auto">
        {bookings && <PatientResultInfo booking={bookings[0]} />}
        sadfasd asdad asd asd tooi khong ier dew
      </div>
    </div>
  );
}
