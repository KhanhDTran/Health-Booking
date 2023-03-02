import { useState, useEffect } from "react";
import FirstSection from "./homeSections/FirstSection";
import AboutUsSection from "./homeSections/AboutUsSection";
import Footer from "../../components/Footer";
import SpecialtySection from "./homeSections/SpecialtySection";
import DoctorSection from "./homeSections/DoctorSection";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctors,
  fetchAllSpecialties,
} from "../../store/features/fetchDataSlice";

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
