import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import ClinicBooking from "../pages/system/clinic/ClinicBooking";
import ClinicPatientRecord from "../pages/system/clinic/ClinicPatientRecord";
import ClinicExaminingList from "../pages/system/clinic/ClinicExaminingList";

export default function ClinicRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Clinic  ----------------------*/}

        <Route path="/booking" element={<ClinicBooking />} />
        <Route path="/examining-list" element={<ClinicExaminingList />} />
        <Route
          path="/patient_record/:booking_id"
          element={<ClinicPatientRecord />}
        />
        {/* <Route path="/record" element={<ClinicRecord />} /> */}

        <Route path="*" element={<Error />} />

        {/* --------------- Clinic  ----------------------*/}
      </Routes>
    </div>
  );
}
