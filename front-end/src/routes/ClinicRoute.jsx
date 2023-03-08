import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import ClinicBooking from "../pages/system/clinic/ClinicBooking";
import ClinicRecord from "../pages/system/clinic/ClinicRecord";

export default function ClinicRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Clinic  ----------------------*/}

        <Route path="/booking" element={<ClinicBooking />} />
        <Route path="/record" element={<ClinicRecord />} />

        <Route path="*" element={<Error />} />

        {/* --------------- Clinic  ----------------------*/}
      </Routes>
    </div>
  );
}
