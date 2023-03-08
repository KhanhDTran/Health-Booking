import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import PatientProfile from "../pages/patient/PatientProfile";
import PatientBooking from "../pages/patient/PatientBooking";
import PatientRecord from "../pages/patient/PatientRecord";

export default function PatientRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Patient  ----------------------*/}

        <Route path="/profile/" element={<PatientProfile />} />
        <Route path="/booking" element={<PatientBooking />} />
        <Route path="/record" element={<PatientRecord />} />

        <Route path="*" element={<Error />} />

        {/* --------------- Patient  ----------------------*/}
      </Routes>
    </div>
  );
}
