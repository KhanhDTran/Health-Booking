import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lab from "../pages/system/laboratory/Lab";

export default function LabRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Lab  ----------------------*/}

        <Route path="/" element={<Lab />} />

        <Route path="*" element={<Error />} />

        {/* --------------- Lab  ----------------------*/}
      </Routes>
    </div>
  );
}
