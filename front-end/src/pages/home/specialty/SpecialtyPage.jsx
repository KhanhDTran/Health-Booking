import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import PatientHeader from "../../../components/PatientHeader";
import {
  fetchAllDoctors,
  fetchAllSpecialties,
} from "../../../store/features/fetchDataSlice";
import DoctorBanner from "../doctor/allDoctors/DoctorBanner";
import SpecialtyBanner from "./SpecialtyBanner";

export default function SpecialtyPage() {
  const dispatch = useDispatch();

  const { _id, name } = useParams();

  const { doctors, specialties } = useSelector((state) => state.fetchData);

  // useState

  // UseEffect
  useEffect(() => {
    document.title = `Chuyên Khoa ${name}`;
    dispatch(fetchAllDoctors({ specialty: _id }));
    dispatch(fetchAllSpecialties({ _id }));
  }, []);

  useEffect(() => {
    dispatch(fetchAllSpecialties({ _id }));
    dispatch(fetchAllDoctors({ specialty: _id }));
  }, [_id]);

  console.log(doctors);

  // function
  function a() {}

  return (
    <>
      <PatientHeader />
      <div className="container mx-auto">
        <div className="w-full flex flex-col p-4 gap-8">
          <div className="w-full flex justify-center">
            <h1 className="text-4xl">Chuyên Khoa Y Tế</h1>
          </div>
          {specialties && specialties.length > 0 && (
            <SpecialtyBanner specialty={specialties[0]} />
          )}
          <div className="divider"></div>
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
      </div>
      <Footer />
    </>
  );
}
