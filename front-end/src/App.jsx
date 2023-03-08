import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Error from "./pages/Error";
import Signup from "./pages/auth/Signup";
import DoctorPage from "./pages/home/doctor/detailDoctor/DoctorPage";
import SpecialtyPage from "./pages/home/specialty/SpecialtyPage";
import AllSpecialties from "./pages/home/specialty/AllSpecialties";
import AllDoctorsPage from "./pages/home/doctor/allDoctors/AllDoctorsPage";
import AdminRoute from "./routes/AdminRoute";
import PatientRoute from "./routes/PatientRoute";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/all-doctors" element={<AllDoctorsPage />} />
          <Route path="/doctor/:_id/:position/:name" element={<DoctorPage />} />

          <Route path="/all-specialties" element={<AllSpecialties />} />
          <Route path="/specialty/:_id/:name" element={<SpecialtyPage />} />

          {/* Authenticate */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Authenticate */}

          {/* --------------- Clinic  ----------------------*/}

          {/* --------------- Clinic  ----------------------*/}

          {/* --------------- Lab  ----------------------*/}

          {/* --------------- Lab  ----------------------*/}

          <Route path="/system/admin//*" element={<AdminRoute />} />

          <Route path="/patient//*" element={<PatientRoute />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
