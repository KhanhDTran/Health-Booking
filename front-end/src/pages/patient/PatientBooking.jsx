import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import PatientHeader from "../../components/PatientHeader";
import Footer from "../../components/Footer";


export default function PatientBooking() {
  const dispatch = useDispatch();
  // useState
  const [x, setX] = useState("");

  // UseEffect
  useEffect(() => {}, []);

  // function
  function a() {}

  async function b() {}

  return (
    <>
      <PatientHeader />
      <div>Patient Booking</div>
      <Footer />

    </>
  );
}
