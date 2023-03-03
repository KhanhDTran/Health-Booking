import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import {
  fetchAllDoctors,
  fetchAllSpecialties,
} from "../../store/features/fetchDataSlice";
import AboutUsSection from "./homeSections/AboutUsSection";
import DoctorSection from "./homeSections/DoctorSection";
import FirstSection from "./homeSections/FirstSection";
import SpecialtySection from "./homeSections/SpecialtySection";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Trang chủ";
    dispatch(fetchAllDoctors());
    dispatch(fetchAllSpecialties());
  }, []);

  return (
    <div>
      <FirstSection />
      <AboutUsSection />
      <SpecialtySection />
      <DoctorSection />
      <Footer />
    </div>
  );
}
