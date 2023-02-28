import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logged_out } from "../store/features/userSlice";
import "../pages/auth/ModalOtp.scss";
import { NavLink, Link } from "react-router-dom";

export default function AdminHeader(props) {
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 sticky  top-0 z-30" data-theme="night">
        <input id="side-bar-admin" type="checkbox" className="drawer-toggle" />

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
                <NavLink to="/system/admin/">Bảng Điều Khiển</NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/admin/manage-clinic">
                  Phòng Khám Chuyên Khoa
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/admin/manage-laboratory">
                  Phòng Khám Lâm Sàng
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/admin/manage-specialty">
                  Chuyên Khoa Y Tế
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/admin/manage-doctor">
                  Bác Sĩ Chuyên Khoa
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/admin/manage-schedule">
                  Bảng Biểu Thời Gian
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/admin/manage-service">
                  Dịch Vụ Y Tế
                </NavLink>
              </li>
            </ul>
          </div>
          <a
            className="btn btn-ghost normal-case text-sm lg:text-md"
            onClick={() => {
              if (role === "admin") navigate("/system/admin/");
            }}
          >
            <div className="w-10 rounded">
              <img src={logo} />
            </div>
            <span className="hidden lg:flex text-lg">Health Booking</span>
          </a>
        </div>
        <div className="navbar-center text-sm lg:flex">
          <span className="text-2xl">
            {role && role === "admin" && <>Quản trị viên</>}
          </span>
        </div>
        <div className="navbar-end">
          <a
            className="btn btn-ghost normal-case text-md lg:text-xl"
            onClick={() => {
              dispatch(logged_out());
              navigate("/login");
            }}
          >
            <div className="w-10 rounded">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
