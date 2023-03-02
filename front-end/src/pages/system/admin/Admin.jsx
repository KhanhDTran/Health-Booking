import { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clinicImg from "../../../assets/images/admin/clinic.jpg";
import labImg from "../../../assets/images/admin/lab.jpg";
import specialtyImg from "../../../assets/images/admin/specialty.jpg";
import doctorImg from "../../../assets/images/admin/doctor.jpg";
import scheduleImg from "../../../assets/images/admin/schedule.jpg";
import serviceImg from "../../../assets/images/admin/service.jpg";

export default function Admin() {
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | Bảng Điều Khiển";
  }, []);

  return (
    <div>
      {role && role === "admin" ? (
        <>
          <AdminHeader />

          <div className="container mx-auto flex flex-col gap-4 pb-10">
            <div className="flex text-center w-100">
              <p className="text-center text-4xl p-4">Bảng Điều Khiển</p>
            </div>

            <div className="not-prose  flex grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
              {/* -----------------  Manage Clinic  ----------------- */}

              <div
                className="card  bg-base-200 hover:bg-base-300 hover:cursor-pointer  shadow-xl"
                onClick={() => {
                  navigate("/system/admin/manage-clinic");
                }}
              >
                <figure className="px-10 pt-10 ">
                  <img src={clinicImg} alt="" className="rounded-xl " />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Clinic</h2>
                  <p>Quản lý phòng khám chuyên khoa</p>
                </div>
              </div>

              {/* -----------------  Manage Clinic  ----------------- */}

              {/* -----------------  Manage Lab  ----------------- */}

              <div
                className="card  bg-base-200 hover:bg-base-300 hover:cursor-pointer  shadow-xl"
                onClick={() => {
                  navigate("/system/admin/manage-laboratory");
                }}
              >
                <figure className="px-10 pt-10 ">
                  <img src={labImg} alt="" className="rounded-xl " />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Laboratory</h2>
                  <p>Quản lý phòng khám lâm sàng</p>
                </div>
              </div>

              {/* -----------------  Manage Lab  ----------------- */}

              {/* -----------------  Manage specialty  ----------------- */}

              <div
                className="card  bg-base-200 hover:bg-base-300 hover:cursor-pointer  shadow-xl"
                onClick={() => {
                  navigate("/system/admin/manage-specialty");
                }}
              >
                <figure className="px-10 pt-10 ">
                  <img src={specialtyImg} alt="" className="rounded-xl " />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Specialty</h2>
                  <p>Quản lý chuyên khoa y tế</p>
                </div>
              </div>

              {/* -----------------  Manage specialty  ----------------- */}

              {/* -----------------  Manage doctor  ----------------- */}

              <div
                className="card  bg-base-200 hover:bg-base-300 hover:cursor-pointer  shadow-xl"
                onClick={() => {
                  navigate("/system/admin/manage-doctor");
                }}
              >
                <figure className="px-10 pt-10 ">
                  <img src={doctorImg} alt="" className="rounded-xl " />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Doctor</h2>
                  <p>Quản lý bác sĩ chuyên khoa</p>
                </div>
              </div>

              {/* -----------------  Manage doctor  ----------------- */}

              {/* -----------------  Manage schedule  ----------------- */}

              <div
                className="card  bg-base-200 hover:bg-base-300 hover:cursor-pointer  shadow-xl"
                onClick={() => {
                  navigate("/system/admin/manage-schedule");
                }}
              >
                <figure className="px-10 pt-10 ">
                  <img src={scheduleImg} alt="" className="rounded-xl " />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Schedule</h2>
                  <p>Quản lý thời gian biểu khám bệnh</p>
                </div>
              </div>

              {/* -----------------  Manage schedule  ----------------- */}

              {/* -----------------  Manage service  ----------------- */}

              <div
                className="card  bg-base-200 hover:bg-base-300 hover:cursor-pointer  shadow-xl"
                onClick={() => {
                  navigate("/system/admin/manage-service");
                }}
              >
                <figure className="px-10 pt-10 ">
                  <img src={serviceImg} alt="" className="rounded-xl " />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Service</h2>
                  <p>Quản lý dịch vụ y tế</p>
                </div>
              </div>

              {/* -----------------  Manage service  ----------------- */}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="grid  place-items-center py-24 px-6 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">401</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Bạn không có quyền truy cập trang này
              </h1>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Về trang chủ
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
