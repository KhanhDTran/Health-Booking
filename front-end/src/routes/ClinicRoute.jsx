import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import ClinicBooking from "../pages/system/clinic/clinicBooking/ClinicBooking";
import ClinicPatientRecord from "../pages/system/clinic/clinicRecord/ClinicPatientRecord";
import ClinicExaminingList from "../pages/system/clinic/clinicBooking/ClinicExaminingList";
import ClinicExaminedList from "../pages/system/clinic/clinicBooking/ClinicExaminedList";

export default function ClinicRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Clinic  ----------------------*/}

        <Route path="/booking" element={<ClinicBooking />} />
        <Route path="/examining-list" element={<ClinicExaminingList />} />
        <Route path="/examined-list" element={<ClinicExaminedList />} />
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
