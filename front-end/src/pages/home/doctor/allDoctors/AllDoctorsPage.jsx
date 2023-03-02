import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../../../components/Footer";
import PatientHeader from "../../../../components/PatientHeader";
import { fetchAllDoctors } from "../../../../store/features/fetchDataSlice";
import DoctorBanner from "./DoctorBanner";

export default function SpecialtyPage() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.fetchData);

  // UseEffect
  useEffect(() => {
    document.title = "Bác Sĩ Chuyên Khoa";
    dispatch(fetchAllDoctors());
  }, []);

  return (
    <>
      <PatientHeader />
      <div className="container mx-auto justify-center">
        <div className="w-full flex justify-center">
          <h1 className="p-10 text-4xl">Danh sách bác sĩ chuyên khoa</h1>
        </div>
        {doctors &&
          doctors.length > 0 &&
          doctors.map((item) => {
            return (
              <div className="flex flex-col p-4 gap-8" key={item._id}>
                <DoctorBanner {...{ doctor: item }} />
              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
}
