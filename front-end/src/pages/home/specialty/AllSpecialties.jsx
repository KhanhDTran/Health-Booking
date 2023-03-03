import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer";
import PatientHeader from "../../../components/PatientHeader";
import { fetchAllSpecialties } from "../../../store/features/fetchDataSlice";
import SpecialtyBanner from "./SpecialtyBanner";

export default function SpecialtyPage() {
  const dispatch = useDispatch();

  const { specialties } = useSelector((state) => state.fetchData);

  // useState

  // UseEffect
  useEffect(() => {
    document.title = "Chuyên Khoa Y Tế";
    dispatch(fetchAllSpecialties());
  }, []);

  // function
  function a() {}

  return (
    <>
      <PatientHeader />
      <div className="container mx-auto justify-center">
        <div className="w-full flex justify-center">
          <h1 className="p-10 text-4xl">Danh sách chuyên khoa y tế</h1>
        </div>
        {specialties &&
          specialties.length > 0 &&
          specialties.map((item) => {
            return (
              <div className="flex flex-col p-4 gap-8" key={item._id}>
                <SpecialtyBanner {...{ specialty: item }} />
              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
}
