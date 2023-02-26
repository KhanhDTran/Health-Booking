import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Error from "./pages/Error";
import Signup from "./pages/auth/Signup";
import Admin from "./pages/system/admin/Admin";
import ManageClinic from "./pages/system/admin/clinic/ManageClinic";
import ManageLab from "./pages/system/admin/lab/ManageLab";
import ManageDoctor from "./pages/system/admin/doctor/ManageDoctor";
import ManageSchedule from "./pages/system/admin/schedule/ManageSchedule";
import ManageSpecialty from "./pages/system/admin/specialty/ManageSpecialty";
import ManageService from "./pages/system/admin/service/ManageService";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Authenticate */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Error />} />

          {/* <Route path="/doctor/:id" element={<DoctorPage />} /> */}

          <Route path="/system/admin/" element={<Admin />} />
          <Route
            path="/system/admin/manage-clinic"
            element={<ManageClinic />}
          />
          <Route
            path="/system/admin/manage-laboratory"
            element={<ManageLab />}
          />
          <Route
            path="/system/admin/manage-specialty"
            element={<ManageSpecialty />}
          />
          <Route
            path="/system/admin/manage-doctor"
            element={<ManageDoctor />}
          />
          <Route
            path="/system/admin/manage-schedule"
            element={<ManageSchedule />}
          />
          <Route
            path="/system/admin/manage-service"
            element={<ManageService />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
