import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import PatientProfile from "../pages/patient/profile/PatientProfile";
import PatientBooking from "../pages/patient/booking/PatientBooking";
import PatientRecord from "../pages/patient/record/PatientRecord";
import PatientDetailRecord from "../pages/patient/record/PatientDetailRecord";

export default function PatientRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Patient  ----------------------*/}

        <Route path="/profile/" element={<PatientProfile />} />
        <Route path="/booking" element={<PatientBooking />} />
        <Route path="/records" element={<PatientRecord />} />
        <Route
          path="/detail-record/:booking_id"
          element={<PatientDetailRecord />}
        />

        <Route path="*" element={<Error />} />

        {/* --------------- Patient  ----------------------*/}
      </Routes>
    </div>
  );
}
