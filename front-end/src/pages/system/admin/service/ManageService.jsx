import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";

export default function ManageService() {
  const { role } = useSelector((state) => state.user);

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            <div className="container mx-auto flex flex-col">
              <div className="title text-md lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Trang quản lý Dịch vụ y tế</span>
              </div>
              <div className="divider"></div>
              <div></div>
            </div>
          </>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}
