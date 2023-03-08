import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import Admin from "../pages/system/admin/Admin";
import ManageClinic from "../pages/system/admin/clinic/ManageClinic";
import ManageDoctor from "../pages/system/admin/doctor/ManageDoctor";
import ManageLab from "../pages/system/admin/lab/ManageLab";
import ManageSchedule from "../pages/system/admin/schedule/ManageSchedule";
import ManageService from "../pages/system/admin/service/ManageService";
import ManageSpecialty from "../pages/system/admin/specialty/ManageSpecialty";

export default function AdminRoute() {
  return (
    <div>
      <Routes>
        {/* --------------- Admin  ----------------------*/}

        <Route path="/" element={<Admin />} />
        <Route path="/manage-clinic" element={<ManageClinic />} />
        <Route path="/manage-laboratory" element={<ManageLab />} />
        <Route path="/manage-specialty" element={<ManageSpecialty />} />
        <Route path="/manage-doctor" element={<ManageDoctor />} />
        <Route path="/manage-schedule" element={<ManageSchedule />} />
        <Route path="/manage-service" element={<ManageService />} />
        <Route path="*" element={<Error />} />

        {/* --------------- Admin  ----------------------*/}
      </Routes>
    </div>
  );
}
