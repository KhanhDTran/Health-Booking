import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchAllDoctors } from "../../../store/features/fetchDataSlice";
import PatientHeader from "../../../components/PatientHeader";
import Footer from "../../../components/Footer";
import OtherDocSection from "./OtherDocSection";
import ClinicSection from "./ClinicSection";
import DoctorInfoSection from "./DoctorInfoSection";
import BookingClinicSec from "./BookingClinicSec";

export default function DoctorPage() {
  const dispatch = useDispatch();

  const { _id } = useParams();
  const { doctors } = useSelector((state) => state.fetchData);

  const [doctor, setDoctor] = useState(null);

  // useState

  // UseEffect
  useEffect(() => {
    document.title = "Chi tiết bác sĩ";
    dispatch(fetchAllDoctors());
  }, []);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [_id]);

  useEffect(() => {
    if (doctors) setDoctor(_.find(doctors, { _id }));
  }, [doctors]);

  // function
  function a() {}

  return (
    <>
      {doctor && (
        <>
          <PatientHeader />
          <div className="container mx-auto flex flex-col p-4">
            <DoctorInfoSection doctor={doctor} />
            <div className="divider"></div>
            <div className="doctor-info  flex flex-col p-4">
              <div className="w-full text-center text-3xl">
                <h1 className="">
                  <i className="fa-regular fa-pen-to-square"></i> Đặt lịch khám
                </h1>
              </div>
              <BookingClinicSec clinic={doctor.clinic} />
            </div>
            <div className="divider"></div>

            <ClinicSection clinic={doctor.clinic} />

            <div className="divider"></div>

            <OtherDocSection
              doctors={_.sampleSize(
                _.filter(doctors, (o) => {
                  return o._id !== _id;
                }),
                4
              )}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
