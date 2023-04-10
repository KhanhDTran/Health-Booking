import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logged_out } from "../store/features/userSlice";
import "../pages/auth/ModalOtp.scss";
import { NavLink, Link } from "react-router-dom";
import defaultAva from "../assets/images/patient/defaultAva.jpg";

export default function LabHeader(props) {
  const { role, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!role || role !== "lab") {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {" "}
      <div className="navbar sticky h-auto top-0 z-30 bg-base-300">
        <div className="navbar-start">
          <a
            className="btn btn-ghost normal-case text-sm lg:text-md"
            onClick={() => {
              navigate("/system/laboratory/booking");
            }}
          >
            <div className="w-10 rounded">
              <img src={logo} />
            </div>
            <span className=" lg:flex text-lg">Health Booking</span>
          </a>
        </div>
        {/* -------------------------- */}

        <div className="navbar-center text-sm hidden lg:flex">
          <span className="text-2xl">Phòng khám lâm sàng</span>
        </div>

        {/* ----------------------------- */}

        <div className="navbar-end">
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className=" rounded-full  ">
                <img src={user.lab.image ? user.lab.image : defaultAva} />
              </div>
            </label>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="text-xl">{user.lab.name}</a>
              </li>
              <li></li>

              <li>
                <NavLink to="/system/laboratory/booking">
                  <i className="fa-solid fa-calendar"></i>
                  Lịch hẹn khám bệnh
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/laboratory/examining-list">
                  <i className="fa-solid fa-list"></i>
                  Danh sách đang khám
                </NavLink>
              </li>
              <li></li>
              <li>
                <NavLink to="/system/laboratory/examined-list">
                  <i className="fa-solid fa-list"></i>
                  Danh sách đã khám xong
                </NavLink>
              </li>
              <li></li>

              <li>
                <NavLink
                  to="/login"
                  onClick={() => {
                    dispatch(logged_out());
                    navigate("/login");
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Đăng xuất{" "}
                </NavLink>
              </li>

              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
