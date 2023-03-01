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
        <div className="flex-1">
          <a
            className="btn btn-ghost normal-case text-sm lg:text-md"
            onClick={() => navigate("/")}
          >
            <div className="w-10 rounded">
              <img src={logo} />
            </div>
            <span className="hidden lg:flex text-lg">Health Booking</span>
          </a>
        </div>
        <div className="flex-none">
          {role && role === "patient" ? (
            <>
              {" "}
              <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full mr-2 ">
                    <img src={defaultAva} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="text-xl">
                      <i className="fa-solid fa-user-tie text-sm"></i>
                      {user.patient.name}
                    </a>
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
                  <div className=" lg:w-32 lg:flex-row flex justify-between items center">
                    <span className=" hidden lg:flex text-lg ">Đăng nhập</span>
                    <i className="fa-solid fa-right-to-bracket pt-2"></i>
                  </div>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
