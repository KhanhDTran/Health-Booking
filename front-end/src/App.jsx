import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Error from "./pages/Error";
import Signup from "./pages/auth/Signup";
import Admin from "./pages/system/admin/Admin";

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
          <Route path="system/admin">
            <Route index={true} element={<Admin />} />
            {/* <Route path="manage-doctors-profile" element={<ManageDoctor />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="manage-specialties" element={<ManageSpecialty />} />
            <Route path="manage-clinics" element={<ManageClinic />} />
            <Route
              path="manage-doctors-schedule"
              element={<ManageDoctorSchedule />}
            /> */}
          </Route>
          {/* 
          <Route path="system/doctor">
            <Route index={true} element={<Doctor />} />
          </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
