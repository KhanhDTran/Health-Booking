import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lab from "../pages/system/laboratory/Lab";
import LabBooking from "../pages/system/laboratory/labBooking/LabBooking";
import LabExaminingList from "../pages/system/laboratory/labBooking/LabExaminingList";
import ResultLab from "../pages/system/laboratory/labResult/ResultLab";
import LabExaminedList from "../pages/system/laboratory/labBooking/labExaminedList";

export default function LabRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Lab  ----------------------*/}

        <Route path="/booking" element={<LabBooking />} />
        <Route path="/examining-list" element={<LabExaminingList />} />
        <Route path="/examined-list" element={<LabExaminedList />} />
        <Route path="/result/:booking_id/:record_id" element={<ResultLab />} />
        <Route path="*" element={<Error />} />

        {/* --------------- Lab  ----------------------*/}
      </Routes>
    </div>
  );
}
