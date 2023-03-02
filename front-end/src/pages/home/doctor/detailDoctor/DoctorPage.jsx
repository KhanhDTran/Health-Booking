import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../../../components/Footer";
import PatientHeader from "../../../../components/PatientHeader";
import { fetchAllDoctors } from "../../../../store/features/fetchDataSlice";
import BookingClinicSec from "./BookingClinicSec";
import ClinicSection from "./ClinicSection";
import DoctorInfoSection from "./DoctorInfoSection";
import OtherDocSection from "./OtherDocSection";

export default function DoctorPage() {
  const dispatch = useDispatch();

  const { _id, name, position } = useParams();
  const { doctors } = useSelector((state) => state.fetchData);
  const [doctor, setDoctor] = useState(null);

  // useState

  // UseEffect
  useEffect(() => {
    document.title = `${position}` + " " + `${name}`;
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
              <BookingClinicSec {...{ clinic: doctor.clinic, doctor }} />
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
