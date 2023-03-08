import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logged_out } from "../store/features/userSlice";
import { NavLink, Link } from "react-router-dom";
import defaultAva from "../assets/images/patient/defaultAva.jpg";

export default function PatientHeader(props) {
  const { role, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <div className="navbar sticky h-auto top-0 z-30 bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/all-specialties">Chuyên khoa y tế</NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/all-doctors">Bác sĩ chuyên khoa</NavLink>
              </li>
            </ul>
          </div>
          <a
            className="btn btn-ghost normal-case text-sm lg:text-md"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="w-10 rounded">
              <img src={logo} />
            </div>
            <span className="hidden lg:flex text-lg">Health Booking</span>
          </a>
        </div>
        {/* -------------------------- */}

        {/* ----------------------------- */}

        {role && role === "patient" ? (
          <>
            {" "}
            <div className="navbar-end">
              <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full mr-2 ">
                    <img
                      src={user.patient.image ? user.patient.image : defaultAva}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="text-xl">{user.patient.name}</a>
                  </li>
                  <li></li>
                  <li>
                    <NavLink to="/patient/profile/">
                      <i className="fa-solid fa-user-tie text-sm"></i>Thông tin
                      cá nhân
                    </NavLink>
                  </li>
                  <li></li>
                  <li>
                    <NavLink to="/patient/booking/">
                      <i className="fa-solid fa-calendar"></i>
                      Lịch hẹn khám bệnh
                    </NavLink>
                  </li>
                  <li></li>
                  <li>
                    <NavLink to="/patient/record/">
                      <i className="fa-solid fa-book-medical"></i>
                      Hồ sơ bệnh án
                    </NavLink>
                  </li>
                  <li></li>

                  <li>
                    <a
                      onClick={() => {
                        dispatch(logged_out());
                        navigate("/");
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      Đăng xuất{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="navbar-end">
              <a
                className="btn btn-ghost normal-case text-md lg:text-xl"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <div className=" items center">
                  <i className="fa-solid fa-right-to-bracket pt-2"></i>
                </div>
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
