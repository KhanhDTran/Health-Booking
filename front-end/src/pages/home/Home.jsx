import { useState, useEffect } from "react";
import FirstSection from "./sections/FirstSection";
import AboutUsSection from "./sections/AboutUsSection";
import Footer from "../../components/Footer";
import SpecialtySection from "./sections/SpecialtySection";
import DoctorSection from "./sections/DoctorSection";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctors,
  fetchAllSpecialties,
} from "../../store/features/fetchDataSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
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
